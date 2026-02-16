export type Grid<T = string> = T[][];

export function parseGrid(lines: string[]): Grid<string>;
export function parseGrid<T>(
  lines: string[],
  parser: (char: string, row: number, col: number) => T,
): Grid<T>;
export function parseGrid<T>(
  lines: string[],
  parser?: (char: string, row: number, col: number) => T,
): Grid<string> | Grid<T> {
  if (parser) {
    return lines.map((line, row) =>
      Array.from(line).map((char, col) => parser(char, row, col)),
    );
  }

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
