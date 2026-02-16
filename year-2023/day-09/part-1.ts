import { History, OasisReport } from "./utils";

function extrapolateNext(history: History): number {
  let current = [...history];
  let total = 0;

  while (true) {
    total += current[current.length - 1];

    if (current.every((v) => v === 0)) break;

    const next: number[] = [];
    for (let i = 0; i < current.length - 1; i++) {
      next.push(current[i + 1] - current[i]);
    }

    current = next;
  }

  return total;
}

export function part1Run(report: OasisReport) {
  return report.reduce((total, history) => total + extrapolateNext(history), 0);
}
