import { getRanges } from "./utils";

export function hasRepeatedPattern(
  value: number,
  countRepeated: number
): boolean {
  if (countRepeated <= 1) {
    return false;
  }

  const text = String(value);

  if (text.length === 0 || text.length % countRepeated !== 0) {
    return false;
  }

  const blockSize = text.length / countRepeated;
  const firstBlock = text.slice(0, blockSize);

  for (let i = 1; i < countRepeated; i++) {
    const start = blockSize * i;
    const nextBlock = text.slice(start, start + blockSize);

    if (nextBlock !== firstBlock) {
      return false;
    }
  }

  return true;
}

export function part2Run(content: string) {
  let total = 0;

  for (const [rangeStart, rangeEnd] of getRanges(content)) {
    for (let id = rangeStart; id <= rangeEnd; id++) {
      if (
        hasRepeatedPattern(id, 2) ||
        hasRepeatedPattern(id, 3) ||
        hasRepeatedPattern(id, 5) ||
        hasRepeatedPattern(id, 7)
      ) {
        total += id;
      }
    }
  }

  return total;
}
