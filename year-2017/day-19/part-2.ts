import { Grid } from "../../utils/parsers";

export function part2Run(grid: Grid<string>) {
  const height = grid.length;

  const get = (x: number, y: number): string => {
    if (y < 0 || y >= height) return " ";
    const row = grid[y];
    if (!row || x < 0 || x >= row.length) return " ";
    return row[x] ?? " ";
  };

  let x = grid[0].indexOf("|");
  let y = 0;

  let dx = 0;
  let dy = 1;

  let steps = 0;

  while (true) {
    const c = get(x, y);

    if (c === " ") break;

    steps++;

    if (c === "+") {
      if (dx === 0) {
        // moving vertically
        if (get(x - 1, y) !== " ") {
          dx = -1;
          dy = 0;
        } else {
          dx = 1;
          dy = 0;
        }
      } else {
        // moving horizontally
        if (get(x, y - 1) !== " ") {
          dx = 0;
          dy = -1;
        } else {
          dx = 0;
          dy = 1;
        }
      }
    }

    x += dx;
    y += dy;
  }

  return steps;
}
