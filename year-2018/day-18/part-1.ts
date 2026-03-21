import { Grid } from "../../utils/parsers";
import { Acre } from "./utils";

export function part1Run(grid: Grid<Acre>) {
  const height = grid.length;
  const width = grid[0].length;

  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  function step(grid: Grid<Acre>): Grid<Acre> {
    const next: Grid<Acre> = grid.map((row) => [...row]);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let trees = 0;
        let lumber = 0;

        for (const [dy, dx] of dirs) {
          const ny = y + dy;
          const nx = x + dx;

          if (ny < 0 || ny >= height || nx < 0 || nx >= width) continue;

          if (grid[ny][nx] === "|") trees++;
          if (grid[ny][nx] === "#") lumber++;
        }

        const curr = grid[y][x];

        if (curr === "." && trees >= 3) {
          next[y][x] = "|";
        } else if (curr === "|" && lumber >= 3) {
          next[y][x] = "#";
        } else if (curr === "#") {
          if (!(lumber >= 1 && trees >= 1)) {
            next[y][x] = ".";
          }
        }
      }
    }

    return next;
  }

  // simulate 10 minutes
  for (let i = 0; i < 10; i++) {
    grid = step(grid);
  }

  // count result
  let trees = 0;
  let lumber = 0;

  for (const row of grid) {
    for (const cell of row) {
      if (cell === "|") trees++;
      if (cell === "#") lumber++;
    }
  }

  return trees * lumber;
}
