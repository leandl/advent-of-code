export type History = number[];
export type OasisReport = History[];

export function parseOasisReport(lines: string[]): OasisReport {
  return lines.map((line: string) =>
    line
      .trim()
      .split(/\s+/)
      .map((value: string): number => Number(value)),
  );
}
