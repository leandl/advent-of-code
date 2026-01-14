export function part2Run(lines: string[]) {
  let validCount = 0;

  for (const line of lines) {
    const words = line.trim().split(" ");

    const normalized = words.map((word) => word.split("").sort().join(""));

    const unique = new Set(normalized);

    if (normalized.length === unique.size) {
      validCount++;
    }
  }

  return validCount;
}
