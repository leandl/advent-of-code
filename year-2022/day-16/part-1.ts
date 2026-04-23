import { computeDistances, Valve } from "./utils";

export function part1Run(graph: Map<string, Valve>) {
  const dist = computeDistances(graph);

  // válvulas úteis
  const useful = [...graph.values()]
    .filter((v) => v.flow > 0)
    .map((v) => v.name);

  const index = new Map<string, number>();
  useful.forEach((v, i) => index.set(v, i));

  const memo = new Map<string, number>();

  function dfs(pos: string, time: number, mask: number): number {
    const key = `${pos}|${time}|${mask}`;
    if (memo.has(key)) return memo.get(key)!;

    let best = 0;

    for (const next of useful) {
      const bit = 1 << index.get(next)!;

      // já aberto
      if (mask & bit) continue;

      const d = dist.get(pos)!.get(next)!;

      const remaining = time - d - 1;
      if (remaining <= 0) continue;

      const gain = graph.get(next)!.flow * remaining;

      const value = gain + dfs(next, remaining, mask | bit);

      best = Math.max(best, value);
    }

    memo.set(key, best);
    return best;
  }

  return dfs("AA", 30, 0);
}
