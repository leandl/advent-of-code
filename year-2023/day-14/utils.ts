import { Grid } from "../../utils/parsers";

export function tiltNorth(grid: Grid<string>): Grid<string> {
  const height = grid.length;
  const width = grid[0].length;

  // clone do grid
  const result = grid.map((row) => [...row]);

  for (let col = 0; col < width; col++) {
    let targetRow = 0;

    for (let row = 0; row < height; row++) {
      const cell = result[row][col];

      if (cell === "#") {
        targetRow = row + 1;
      } else if (cell === "O") {
        if (row !== targetRow) {
          result[targetRow][col] = "O";
          result[row][col] = ".";
        }
        targetRow++;
      }
    }
  }

  return result;
}

export function calculateLoad(grid: Grid<string>): number {
  const height = grid.length;
  let total = 0;

  for (let row = 0; row < height; row++) {
    const weight = height - row;

    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === "O") {
        total += weight;
      }
    }
  }

  return total;
}

function rotateClockwise(grid: Grid<string>): Grid<string> {
  const h = grid.length;
  const w = grid[0].length;

  const res = Array.from({ length: w }, () =>
    Array(h).fill("."),
  ) as Grid<string>;

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      res[c][h - 1 - r] = grid[r][c];
    }
  }

  return res;
}

export function tiltCycle(grid: Grid<string>): Grid<string> {
  for (let i = 0; i < 4; i++) {
    grid = tiltNorth(grid);
    grid = rotateClockwise(grid);
  }
  return grid;
}

export function serialize(grid: Grid<string>): string {
  return grid.map((row) => row.join("")).join("\n");
}
