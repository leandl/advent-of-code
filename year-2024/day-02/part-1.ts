import { isSafeReport, parseReports } from "./utils";

export function part1Run(lines: string[]): number {
  const reports = parseReports(lines);

  let safeReportsCount = 0;

  for (const report of reports) {
    if (isSafeReport(report)) {
      safeReportsCount++;
    }
  }

  return safeReportsCount;
}
