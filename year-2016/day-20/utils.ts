export type Range = {
  start: number;
  end: number;
};

export const MAX_IP = 4294967295;

export function parseRanges(lines: string[]): Range[] {
  return lines.map((line) => {
    const [start, end] = line.split("-").map(Number);

    if (Number.isNaN(start) || Number.isNaN(end)) {
      throw new Error(`Invalid range line: ${line}`);
    }

    return { start, end };
  });
}
