import { isSafeReport, parseReports, ReportLevels } from "./utils";

function isSafeReportWithDampener(report: ReportLevels): boolean {
  if (isSafeReport(report)) return true;

  for (let indexToRemove = 0; indexToRemove < report.length; indexToRemove++) {
    const reportWithoutLevel = report.filter(
      (_, index) => index !== indexToRemove
    );

    if (isSafeReport(reportWithoutLevel)) {
      return true;
    }
  }

  return false;
}

export function part2Run(lines: string[]): number {
  const reports = parseReports(lines);

  let safeReportsCount = 0;

  for (const report of reports) {
    if (isSafeReportWithDampener(report)) {
      safeReportsCount++;
    }
  }

  return safeReportsCount;
}
