import { parseRangesAndValues, Range } from "./utils";

function mergeRanges(ranges: Range[]): Range[] {
  const sortedRanges = [...ranges].sort(
    ([startA], [startB]) => startA - startB
  );

  const merged: Range[] = [];

  for (const [currentStart, currentEnd] of sortedRanges) {
    const lastMerged = merged[merged.length - 1];

    if (!lastMerged || currentStart > lastMerged[1]) {
      merged.push([currentStart, currentEnd]);
      continue;
    }

    lastMerged[1] = Math.max(lastMerged[1], currentEnd);
  }

  return merged;
}

export function part2Run(lines: string[]) {
  const [rangeList] = parseRangesAndValues(lines);
  const mergedRanges = mergeRanges(rangeList);

  let totalFresh = 0;

  for (const [start, end] of mergedRanges) {
    totalFresh += end - start + 1;
  }

  return totalFresh;
}
