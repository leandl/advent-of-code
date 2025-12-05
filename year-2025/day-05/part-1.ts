import { parseRangesAndValues } from "./utils";

export function part1Run(lines: string[]) {
  const [rangeList, valueList] = parseRangesAndValues(lines);

  let freshCount = 0;

  for (const value of valueList) {
    for (const [rangeStart, rangeEnd] of rangeList) {
      if (value >= rangeStart && value <= rangeEnd) {
        freshCount += 1;
        break;
      }
    }
  }

  return freshCount;
}
