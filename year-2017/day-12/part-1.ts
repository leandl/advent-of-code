import { ProgramGraph, ProgramId } from "./utils";

export function part1Run(graph: ProgramGraph) {
  const visited = new Set<ProgramId>();
  const queue: ProgramId[] = [0];

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (visited.has(current)) continue;

    visited.add(current);

    const neighbors = graph.get(current) ?? [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  return visited.size;
}
