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

export type GridFactory<T = string> = () => Grid<T>;

export function createGridFactory(lines: string[]): GridFactory<string>;
export function createGridFactory<T>(
  lines: string[],
  parser: (char: string, row: number, col: number) => T,
): GridFactory<T>;
export function createGridFactory<T>(
  lines: string[],
  parser?: (char: string, row: number, col: number) => T,
): GridFactory<string> | GridFactory<T> {
  if (parser) {
    return (() => parseGrid(lines, parser)) as GridFactory<T>;
  }

  return (() => parseGrid(lines)) as GridFactory<string>;
}

export function parseNumbers(str: string): number[];
export function parseNumbers(lines: string[]): number[];
export function parseNumbers(data: string[] | string): number[] {
  if (Array.isArray(data)) {
    return data.map(Number);
  }

  return data.split(",").map(Number);
}

export function parseList(data: string): string[] {
  return data.split(",");
}
