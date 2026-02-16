import { OasisReport } from "./utils";

function extrapolatePrevious(history: number[]): number {
  let row: number[] = history;
  let result = 0;

  while (row.length > 0) {
    result = row[0] - result;

    // gera próxima linha de diferenças
    row = row.slice(1).map((value, i) => value - row[i]);
  }

  return result;
}

export function part2Run(report: OasisReport): number {
  return report.reduce(
    (total, history) => total + extrapolatePrevious(history),
    0,
  );
}
