import { getRanges } from "./utils";

export function hasDoubleRepeatedPattern(value: number): boolean {
  const text = String(value);

  if (text.length === 0 || text.length % 2 !== 0) {
    return false;
  }

  const half = text.length / 2;
  const firstHalf = text.slice(0, half);
  const secondHalf = text.slice(half);

  return firstHalf === secondHalf;
}

export function part1Run(content: string) {
  let total = 0;

  for (const [rangeStart, rangeEnd] of getRanges(content)) {
    for (let id = rangeStart; id <= rangeEnd; id++) {
      if (hasDoubleRepeatedPattern(id)) {
        total += id;
      }
    }
  }

  return total;
}
