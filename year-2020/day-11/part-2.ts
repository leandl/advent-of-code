import { Grid } from "../../utils/parsers";
import { directions } from "./utils";

function countVisibleOccupied(
  r: number,
  c: number,
  grid: Grid<string>,
): number {
  const rows = grid.length;
  const cols = grid[0].length;

  let count = 0;

  for (const [dr, dc] of directions) {
    let nr = r + dr;
    let nc = c + dc;

    while (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
      const seat = grid[nr][nc];

      if (seat === "L") break; // empty seat blocks view
      if (seat === "#") {
        count++;
        break;
      }

      // floor → keep looking
      nr += dr;
      nc += dc;
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

      const occupied = countVisibleOccupied(r, c, grid);

      if (seat === "L" && occupied === 0) {
        newGrid[r][c] = "#";
        changed = true;
      } else if (seat === "#" && occupied >= 5) {
        newGrid[r][c] = "L";
        changed = true;
      }
    }
  }

  return [newGrid, changed];
}

export function part2Run(grid: Grid<string>) {
  while (true) {
    const [nextGrid, changed] = step(grid);
    if (!changed) break;
    grid = nextGrid;
  }

  return grid.flat().filter((seat) => seat === "#").length;
}
