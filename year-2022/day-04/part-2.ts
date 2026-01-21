import { parseLines } from "./utils";

export function part2Run(lines: string[]) {
  const pairs = parseLines(lines);
  let count = 0;

  for (const [[a, b], [c, d]] of pairs) {
    if (Math.max(a, c) <= Math.min(b, d)) {
      count++;
    }
  }

  return count;
}
