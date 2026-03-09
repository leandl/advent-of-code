import { ProgramGraph, ProgramId } from "./utils";

function exploreGroup(
  start: ProgramId,
  graph: ProgramGraph,
  visited: Set<ProgramId>,
) {
  const queue: ProgramId[] = [start];

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
}

export function part2Run(graph: ProgramGraph) {
  const visited = new Set<ProgramId>();
  let groupCount = 0;

  for (const programId of graph.keys()) {
    if (!visited.has(programId)) {
      exploreGroup(programId, graph, visited);
      groupCount++;
    }
  }

  return groupCount;
}
