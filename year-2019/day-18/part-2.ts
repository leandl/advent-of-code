import { Grid } from "../../utils/parsers";
import { buildGraph, splitMap } from "./utils";

export function part2Run(grid: Grid<string>): number {
  const robotsPos = splitMap(grid);
  const graph = buildGraph(grid, robotsPos);

  const nodes = Object.keys(graph);

  // mapear IDs
  const idMap = new Map<string, number>();
  nodes.forEach((k, i) => idMap.set(k, i));

  const graph2: any[] = [];

  for (const k of nodes) {
    const from = idMap.get(k)!;
    graph2[from] = [];

    for (const to in graph[k]) {
      graph2[from].push({
        to: idMap.get(to)!,
        dist: graph[k][to].dist,
        req: graph[k][to].req,
      });
    }
  }

  // identificar quais IDs são keys
  const keyMaskById: number[] = [];

  for (const k of nodes) {
    if (k.length === 1 && k >= "a") {
      keyMaskById[idMap.get(k)!] = 1 << (k.charCodeAt(0) - 97);
    } else {
      keyMaskById[idMap.get(k)!] = 0;
    }
  }

  let allKeys = 0;
  for (const m of keyMaskById) {
    allKeys |= m || 0;
  }

  const start = [
    idMap.get("@0")!,
    idMap.get("@1")!,
    idMap.get("@2")!,
    idMap.get("@3")!,
  ];

  const memo = new Map<string, number>();

  function encode(robots: number[], keys: number) {
    return `${robots[0]},${robots[1]},${robots[2]},${robots[3]}|${keys}`;
  }

  function dfs(robots: number[], keys: number): number {
    if (keys === allKeys) return 0;

    const k = encode(robots, keys);
    if (memo.has(k)) return memo.get(k)!;

    let best = Infinity;

    for (let i = 0; i < 4; i++) {
      const from = robots[i];

      for (const edge of graph2[from]) {
        const keyBit = keyMaskById[edge.to];

        // não é key → ignora
        if (keyBit === 0) continue;

        // já pegou
        if (keys & keyBit) continue;

        // não tem requisitos
        if ((edge.req & keys) !== edge.req) continue;

        const newRobots = robots.slice();
        newRobots[i] = edge.to;

        const cost = edge.dist + dfs(newRobots, keys | keyBit);

        if (cost < best) best = cost;
      }
    }

    memo.set(k, best);
    return best;
  }

  return dfs(start, 0);
}
