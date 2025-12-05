type ParserSection = "RANGES" | "VALUES";
export type Range = [number, number];

export function parseRangesAndValues(lines: string[]): [Range[], number[]] {
  const rangeList: Range[] = [];
  const valueList: number[] = [];

  let currentSection: ParserSection = "RANGES";

  for (const line of lines) {
    if (line === "") {
      currentSection = "VALUES";
      continue;
    }

    if (currentSection === "VALUES") {
      valueList.push(Number(line));
      continue;
    }

    const [rangeStart, rangeEnd] = line.split("-") as [string, string];
    rangeList.push([Number(rangeStart), Number(rangeEnd)]);
  }

  return [rangeList, valueList];
}
