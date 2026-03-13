import { Grid } from "../../utils/parsers";

export function part1Run(grid: Grid<string>) {
  const height = grid.length;

  const get = (x: number, y: number): string => {
    if (y < 0 || y >= height) return " ";
    if (x < 0 || x >= grid[y].length) return " ";
    return grid[y][x];
  };

  let x = grid[0].indexOf("|");
  let y = 0;

  let dx = 0;
  let dy = 1; // start going down

  let letters = "";

  while (true) {
    const c = get(x, y);

    if (c === " ") break;

    if (/[A-Z]/.test(c)) {
      letters += c;
    }

    if (c === "+") {
      // turning point
      if (dx === 0) {
        // moving vertically -> check left/right
        if (get(x - 1, y) !== " ") {
          dx = -1;
          dy = 0;
        } else if (get(x + 1, y) !== " ") {
          dx = 1;
          dy = 0;
        }
      } else {
        // moving horizontally -> check up/down
        if (get(x, y - 1) !== " ") {
          dx = 0;
          dy = -1;
        } else if (get(x, y + 1) !== " ") {
          dx = 0;
          dy = 1;
        }
      }
    }

    x += dx;
    y += dy;
  }

  return letters;
}
