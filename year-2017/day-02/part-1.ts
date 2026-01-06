import { parseInputPuzzle } from "./utils";

export function part1Run(lines: string[]) {
  const rows = parseInputPuzzle(lines);
  let sum = 0;

  for (const numbers of rows) {
    const max = Math.max(...numbers);
    const min = Math.min(...numbers);

    sum += max - min;
  }

  return sum;
}
