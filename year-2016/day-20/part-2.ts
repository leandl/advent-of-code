import { MAX_IP, Range } from "./utils";

export function part2Run(ranges: Range[]): number {
  const sorted = [...ranges].sort((a, b) => a.start - b.start);

  let current = 0;
  let allowedCount = 0;

  for (const range of sorted) {
    if (range.start > current) {
      allowedCount += range.start - current;
    }

    current = Math.max(current, range.end + 1);

    if (current > MAX_IP) {
      return allowedCount;
    }
  }

  if (current <= MAX_IP) {
    allowedCount += MAX_IP - current + 1;
  }

  return allowedCount;
}
