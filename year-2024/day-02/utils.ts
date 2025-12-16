export type ReportLevels = number[];

export function parseReports(lines: string[]): ReportLevels[] {
  return lines.map((line) => line.split(" ").map(Number));
}

export type TrendDirection = "INCREASING" | "DECREASING";

export function getTrendDirection(
  previousLevel: number,
  nextLevel: number
): TrendDirection | null {
  if (previousLevel < nextLevel) return "INCREASING";
  if (previousLevel > nextLevel) return "DECREASING";
  return null; // equal levels are invalid
}

export function isSafeReport(report: ReportLevels): boolean {
  if (report.length < 2) return false;

  const trend = getTrendDirection(report[0], report[1]);
  if (!trend) return false;

  for (let i = 0; i < report.length - 1; i++) {
    const currentLevel = report[i];
    const nextLevel = report[i + 1];

    const currentTrend = getTrendDirection(currentLevel, nextLevel);
    if (currentTrend !== trend) {
      return false;
    }

    const difference = Math.abs(currentLevel - nextLevel);
    if (difference < 1 || difference > 3) {
      return false;
    }
  }

  return true;
}
