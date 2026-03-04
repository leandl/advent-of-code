import { MAX_IP, Range } from "./utils";

export function part1Run(ranges: Range[]): number {
  const sorted = [...ranges].sort((a, b) => a.start - b.start);

  let current = 0;

  for (const range of sorted) {
    if (range.start > current) {
      return current;
    }

    current = Math.max(current, range.end + 1);

    if (current > MAX_IP) {
      break;
    }
  }

  return current <= MAX_IP ? current : -1;
}
