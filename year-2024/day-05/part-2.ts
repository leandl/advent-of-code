import { isValidUpdate, parseInputPuzzle } from "./utils";

function reorderUpdate(update: number[], rules: [number, number][]): number[] {
  const pages = new Set(update);

  // Grafo e grau de entrada
  const graph = new Map<number, number[]>();
  const inDegree = new Map<number, number>();

  for (const p of pages) {
    graph.set(p, []);
    inDegree.set(p, 0);
  }

  // Construir grafo só com regras relevantes
  for (const [a, b] of rules) {
    if (pages.has(a) && pages.has(b)) {
      graph.get(a)!.push(b);
      inDegree.set(b, inDegree.get(b)! + 1);
    }
  }

  // Kahn's Algorithm
  const queue: number[] = [];
  for (const [p, deg] of inDegree) {
    if (deg === 0) queue.push(p);
  }

  const result: number[] = [];

  while (queue.length > 0) {
    const curr = queue.shift()!;
    result.push(curr);

    for (const next of graph.get(curr)!) {
      inDegree.set(next, inDegree.get(next)! - 1);
      if (inDegree.get(next) === 0) {
        queue.push(next);
      }
    }
  }

  return result;
}

export function part2Run(lines: string[]): number {
  const { rules, updates } = parseInputPuzzle(lines);

  let sumOfMiddles = 0;

  for (const update of updates) {
    if (!isValidUpdate(update, rules)) {
      const sorted = reorderUpdate(update, rules);
      const middle = sorted[Math.floor(sorted.length / 2)];
      sumOfMiddles += middle;
    }
  }

  return sumOfMiddles;
}
