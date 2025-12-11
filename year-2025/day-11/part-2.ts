import { Graph, parseGraph } from "./utils";

const ENTRY_NODE = "svr";
const EXIT_NODE = "out";
const REQUIRED_NODE_A = "dac";
const REQUIRED_NODE_B = "fft";

function countValidPaths(
  graph: Graph,
  node: string,
  hasDac: boolean,
  hasFft: boolean,
  memo: Map<string, number>
): number {
  const key = `${node}|${hasDac}|${hasFft}`;
  const cached = memo.get(key);
  if (cached !== undefined) return cached;

  // Atualiza flags ao entrar neste node
  const nextHasDac = hasDac || node === REQUIRED_NODE_A;
  const nextHasFft = hasFft || node === REQUIRED_NODE_B;

  if (node === EXIT_NODE) {
    const valid = nextHasDac && nextHasFft ? 1 : 0;
    memo.set(key, valid);
    return valid;
  }

  const children = graph.get(node);
  if (!children) {
    memo.set(key, 0);
    return 0;
  }

  let total = 0;
  for (const child of children) {
    total += countValidPaths(graph, child, nextHasDac, nextHasFft, memo);
  }

  memo.set(key, total);
  return total;
}

export function part2Run(lines: string[]): number {
  const graph = parseGraph(lines);

  return countValidPaths(graph, ENTRY_NODE, false, false, new Map());
}
