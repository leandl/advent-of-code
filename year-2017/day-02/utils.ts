export function parseInputPuzzle(lines: string[]): Array<number[]> {
  return lines.map((line) => line.split(/\s+/).map(Number));
}
