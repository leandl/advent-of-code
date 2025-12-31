import { Grid } from "../../utils/parsers";

export type Point = { r: number; c: number };

export function getAntennas(grid: Grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const antennas = new Map<string, Point[]>();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ch = grid[r][c];
      if (ch !== ".") {
        if (!antennas.has(ch)) {
          antennas.set(ch, []);
        }
        antennas.get(ch)!.push({ r, c });
      }
    }
  }

  return antennas;
}

export function inBounds(grid: Grid, p: Point): boolean {
  const rows = grid.length;
  const cols = grid[0].length;

  return p.r >= 0 && p.r < rows && p.c >= 0 && p.c < cols;
}
