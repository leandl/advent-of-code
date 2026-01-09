export type Grid = string[][];

export function parseGrid(lines: string[]): Grid {
  return lines.map((line) => Array.from(line));
}

export function parseNumbers(lines: string[]): number[] {
  return lines.map(Number);
}
