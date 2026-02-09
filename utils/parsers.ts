export type Grid = string[][];

export function parseGrid(lines: string[]): Grid {
  return lines.map((line) => Array.from(line));
}

export function parseNumbers(str: string): number[];
export function parseNumbers(lines: string[]): number[];
export function parseNumbers(data: string[] | string): number[] {
  if (Array.isArray(data)) {
    return data.map(Number);
  }

  return data.split(",").map(Number);
}
