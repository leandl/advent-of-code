import { parseInputPuzzle } from "./utils";

export function part2Run(lines: string[]) {
  const rows = parseInputPuzzle(lines);
  let sum = 0;

  for (const numbers of rows) {
    const result = numbers
      .flatMap((a) => numbers.map((b) => [a, b]))
      .find(([a, b]) => a !== b && a % b === 0)!;

    sum += result[0] / result[1];
  }

  return sum;
}
