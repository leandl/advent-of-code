import { computeDistances, Valve } from "./utils";

export function part2Run(graph: Map<string, Valve>): number {
  const dist = computeDistances(graph);

  const useful = [...graph.values()]
    .filter((v) => v.flow > 0)
    .map((v) => v.name);

  const n = useful.length;

  const index = new Map<string, number>();
  useful.forEach((v, i) => index.set(v, i));

  // best[mask] = melhor score possível abrindo exatamente esse conjunto
  const best = new Map<number, number>();

  function dfs(pos: string, time: number, mask: number, score: number) {
    // guarda o melhor score para esse conjunto
    best.set(mask, Math.max(best.get(mask) ?? 0, score));

    for (const next of useful) {
      const bit = 1 << index.get(next)!;
      if (mask & bit) continue;

      const d = dist.get(pos)!.get(next)!;
      const remaining = time - d - 1;
      if (remaining <= 0) continue;

      const gain = graph.get(next)!.flow * remaining;

      dfs(next, remaining, mask | bit, score + gain);
    }
  }

  // preenche todos os subsets possíveis
  dfs("AA", 26, 0, 0);

  let result = 0;

  const fullMask = (1 << n) - 1;

  // combina você + elefante (máscaras disjuntas)
  for (const [mask, val] of best) {
    const complement = fullMask ^ mask;

    // pode não existir exatamente esse complemento → tenta todos submasks
    let sub = complement;
    while (true) {
      const v2 = best.get(sub) ?? 0;
      result = Math.max(result, val + v2);

      if (sub === 0) break;
      sub = (sub - 1) & complement;
    }
  }

  return result;
}
