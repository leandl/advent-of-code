import { parseLines } from "./utils";

export function part1Run(lines: string[]) {
  const pairs = parseLines(lines);
  let count = 0;

  for (const [[a, b], [c, d]] of pairs) {
    const firstContainsSecond = a <= c && b >= d;
    const secondContainsFirst = c <= a && d >= b;

    if (firstContainsSecond || secondContainsFirst) {
      count++;
    }
  }

  return count;
}
