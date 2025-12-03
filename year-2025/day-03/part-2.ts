const digitsOnlyRegex = /^\d+$/;

function extractGreedyMaxDigits(line: string, count: number): number {
  if (line.length < count) {
    throw new Error("Linha inválida");
  }

  if (!digitsOnlyRegex.test(line)) {
    throw new Error("Linha deve conter apenas dígitos");
  }

  const selectedDigits = Array<number>(count).fill(0);
  let scanPosition = -1;

  for (let digitIndex = 0; digitIndex < count; digitIndex++) {
    scanPosition += 1;
    let bestDigit = Number(line[scanPosition]);
    const lastPossibleStart = line.length - count + digitIndex + 1;

    for (let i = scanPosition + 1; i < lastPossibleStart; i++) {
      const digit = Number(line[i]);

      if (digit > bestDigit) {
        bestDigit = digit;
        scanPosition = i;
      }
    }

    selectedDigits[digitIndex] = bestDigit;
  }

  return Number(selectedDigits.join(""));
}

export function part2Run(lines: string[]) {
  let total = 0;

  for (const line of lines) {
    total += extractGreedyMaxDigits(line, 12);
  }

  return total;
}
