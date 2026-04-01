import { Grid } from "../../utils/parsers";

const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function countNeighbors(grid: Grid<string>, x: number, y: number): number {
  let count = 0;

  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5) {
      if (grid[nx][ny] === "#") count++;
    }
  }

  return count;
}

function nextGrid(grid: Grid<string>): Grid<string> {
  const newGrid: Grid = [];

  for (let i = 0; i < 5; i++) {
    const row: string[] = [];

    for (let j = 0; j < 5; j++) {
      const neighbors = countNeighbors(grid, i, j);
      const cell = grid[i][j];

      if (cell === "#") {
        row.push(neighbors === 1 ? "#" : ".");
      } else {
        row.push(neighbors === 1 || neighbors === 2 ? "#" : ".");
      }
    }

    newGrid.push(row);
  }

  return newGrid;
}

function biodiversity(grid: Grid): number {
  let rating = 0;
  let power = 1;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (grid[i][j] === "#") {
        rating += power;
      }
      power *= 2;
    }
  }

  return rating;
}

function serialize(grid: Grid<string>): string {
  return grid.map((row) => row.join("")).join("");
}

export function part1Run(initial: Grid<string>) {
  const seen = new Set<string>();
  let grid = initial;

  while (true) {
    const key = serialize(grid);

    if (seen.has(key)) {
      return biodiversity(grid);
    }

    seen.add(key);
    grid = nextGrid(grid);
  }
}
