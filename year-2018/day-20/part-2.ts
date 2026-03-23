import { bfs, toKey, buildGraph } from "./utils";

export function part2Run(regex: string) {
  const graph = buildGraph(regex);
  const start = toKey({ x: 0, y: 0 });

  const distances = bfs(graph, start);
  return [...distances.values()].filter((d) => d >= 1000).length;
}
