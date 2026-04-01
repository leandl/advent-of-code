import { Grid } from "../../utils/parsers";
import { directions } from "./utils";

function countOccupiedAdjacent(
  r: number,
  c: number,
  grid: Grid<string>,
): number {
  const rows = grid.length;
  const cols = grid[0].length;

  let count = 0;

  for (const [dr, dc] of directions) {
    const nr = r + dr;
    const nc = c + dc;

    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
      if (grid[nr][nc] === "#") count++;
    }
  }

  return count;
}

function step(grid: Grid<string>): [Grid<string>, boolean] {
  const rows = grid.length;
  const cols = grid[0].length;

  const newGrid = grid.map((row) => [...row]);
  let changed = false;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seat = grid[r][c];

      if (seat === ".") continue;

      const occupied = countOccupiedAdjacent(r, c, grid);

      if (seat === "L" && occupied === 0) {
        newGrid[r][c] = "#";
        changed = true;
      } else if (seat === "#" && occupied >= 4) {
        newGrid[r][c] = "L";
        changed = true;
      }
    }
  }

  return [newGrid, changed];
}

export function part1Run(grid: Grid<string>) {
  while (true) {
    const [nextGrid, changed] = step(grid);
    if (!changed) break;
    grid = nextGrid;
  }

  // Count occupied seats
  return grid.flat().filter((seat) => seat === "#").length;
}
