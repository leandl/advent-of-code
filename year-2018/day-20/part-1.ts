import { buildGraph, bfs, toKey } from "./utils";

export function part1Run(regex: string): number {
  const graph = buildGraph(regex);
  const start = toKey({ x: 0, y: 0 });

  const distances = bfs(graph, start);
  return Math.max(...distances.values());
}
