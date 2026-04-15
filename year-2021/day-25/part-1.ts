import { Grid } from "../../utils/parsers";

export function part1Run(grid: Grid<string>) {
  const height = grid.length;
  const width = grid[0].length;

  let steps = 0;

  while (true) {
    let moved = false;

    // Step 1: move east-facing '>'
    const eastGrid = grid.map((row) => [...row]);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y][x] === ">") {
          const nx = (x + 1) % width;
          if (grid[y][nx] === ".") {
            eastGrid[y][x] = ".";
            eastGrid[y][nx] = ">";
            moved = true;
          }
        }
      }
    }

    // Step 2: move south-facing 'v'
    const southGrid = eastGrid.map((row) => [...row]);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (eastGrid[y][x] === "v") {
          const ny = (y + 1) % height;
          if (eastGrid[ny][x] === ".") {
            southGrid[y][x] = ".";
            southGrid[ny][x] = "v";
            moved = true;
          }
        }
      }
    }

    steps++;
    grid = southGrid;

    if (!moved) break;
  }

  return steps;
}
