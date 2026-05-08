import { Grid } from "../../utils/parsers";

type Dir = "R" | "L" | "U" | "D";

type Beam = {
  x: number;
  y: number;
  dir: Dir;
};

function move(x: number, y: number, dir: Dir) {
  switch (dir) {
    case "R":
      return [x + 1, y] as const;
    case "L":
      return [x - 1, y] as const;
    case "U":
      return [x, y - 1] as const;
    case "D":
      return [x, y + 1] as const;
  }
}

function encode(x: number, y: number, dir: Dir) {
  return `${x},${y},${dir}`;
}

function encodeCell(x: number, y: number) {
  return `${x},${y}`;
}

export function simulate(grid: Grid<string>, start: Beam): number {
  const h = grid.length;
  const w = grid[0].length;

  const stack: Beam[] = [start];
  const visited = new Set<string>();
  const energized = new Set<string>();

  while (stack.length > 0) {
    const beam = stack.pop()!;
    const key = encode(beam.x, beam.y, beam.dir);

    if (visited.has(key)) continue;
    visited.add(key);

    let { x, y, dir } = beam;

    while (x >= 0 && x < w && y >= 0 && y < h) {
      energized.add(encodeCell(x, y));

      const cell = grid[y][x];

      if (cell === ".") {
        // continua
      } else if (cell === "/") {
        if (dir === "R") dir = "U";
        else if (dir === "L") dir = "D";
        else if (dir === "U") dir = "R";
        else if (dir === "D") dir = "L";
      } else if (cell === "\\") {
        if (dir === "R") dir = "D";
        else if (dir === "L") dir = "U";
        else if (dir === "U") dir = "L";
        else if (dir === "D") dir = "R";
      } else if (cell === "|") {
        if (dir === "R" || dir === "L") {
          stack.push({ x, y: y - 1, dir: "U" });
          stack.push({ x, y: y + 1, dir: "D" });
          break;
        }
      } else if (cell === "-") {
        if (dir === "U" || dir === "D") {
          stack.push({ x: x - 1, y, dir: "L" });
          stack.push({ x: x + 1, y, dir: "R" });
          break;
        }
      }

      [x, y] = move(x, y, dir);
    }
  }

  return energized.size;
}
