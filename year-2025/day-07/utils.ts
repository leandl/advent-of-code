export const BEAM = "|";
export const SPLITTER = "^";
export const EMPTY_CELL = ".";
const SOURCE = "S";

export type Position = {
  x: number;
  y: number;
};

export function findBeamSource(grid: Array<string[]>): Position {
  for (let x = 0; x < grid[0].length; x++) {
    const cell = grid[0][x];
    if (cell === SOURCE) {
      return { x, y: 1 };
    }
  }

  throw new Error("Fonte do feixe não encontrada no grid.");
}
