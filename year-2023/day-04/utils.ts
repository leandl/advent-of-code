export type Scratchcard = {
  winningNumbers: Set<number>;
  haveNumbers: number[];
};

export function parseCards(lines: string[]): Scratchcard[] {
  return lines.map((line) => {
    const [, numbersPart] = line.split(":");
    const [winningPart, havePart] = numbersPart.split("|");

    const winningNumbers = new Set(winningPart.trim().split(/\s+/).map(Number));

    const haveNumbers = havePart.trim().split(/\s+/).map(Number);

    return {
      winningNumbers,
      haveNumbers,
    };
  });
}
