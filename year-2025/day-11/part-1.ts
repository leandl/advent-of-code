import { Graph, parseGraph } from "./utils";

const ENTRY_NODE = "you";
const EXIT_NODE = "out";

function countAllPathsFromNode(
  adjacencyList: Graph,
  nodeId: string,
  memoizedCounts: Map<string, number>
): number {
  // Verifica cache
  const cached = memoizedCounts.get(nodeId);
  if (cached !== undefined) return cached;

  // Base: chegamos ao destino final
  if (nodeId === EXIT_NODE) {
    memoizedCounts.set(nodeId, 1);
    return 1;
  }

  const successors = adjacencyList.get(nodeId);
  if (!successors || successors.length === 0) {
    memoizedCounts.set(nodeId, 0);
    return 0;
  }

  let totalPaths = 0;
  for (const successorId of successors) {
    totalPaths += countAllPathsFromNode(
      adjacencyList,
      successorId,
      memoizedCounts
    );
  }

  memoizedCounts.set(nodeId, totalPaths);
  return totalPaths;
}

export function part1Run(lines: string[]): number {
  const graph = parseGraph(lines);
  return countAllPathsFromNode(graph, ENTRY_NODE, new Map());
}
