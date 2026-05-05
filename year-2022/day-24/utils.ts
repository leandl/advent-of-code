import { Grid } from "../../utils/parsers";

type Pos = { x: number; y: number };

const moves = [
  [0, 0],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function wrap(n: number, max: number): number {
  return ((((n - 1) % (max - 2)) + (max - 2)) % (max - 2)) + 1;
}

export class Valley {
  grid: Grid<string>;
  cols: string[][];
  width: number;
  height: number;
  start: Pos;
  end: Pos;
  period: number;

  constructor(grid: Grid<string>) {
    this.grid = grid;
    this.height = grid.length;
    this.width = grid[0].length;

    this.cols = Array.from({ length: this.width }, (_, x) =>
      grid.map((row) => row[x]),
    );

    this.start = { x: grid[0].indexOf("."), y: 0 };
    this.end = { x: grid[this.height - 1].indexOf("."), y: this.height - 1 };

    this.period = lcm(this.width - 2, this.height - 2);
  }

  isFree(x: number, y: number, t: number): boolean {
    // start / end são sempre válidos
    if (x === this.start.x && y === this.start.y) return true;
    if (x === this.end.x && y === this.end.y) return true;

    // fora da área útil
    if (x <= 0 || x >= this.width - 1) return false;
    if (y <= 0 || y >= this.height - 1) return false;

    // parede
    if (this.grid[y][x] === "#") return false;

    // >
    if (this.grid[y][wrap(x - t, this.width)] === ">") return false;

    // <
    if (this.grid[y][wrap(x + t, this.width)] === "<") return false;

    // v
    if (this.grid[wrap(y - t, this.height)][x] === "v") return false;

    // ^
    if (this.grid[wrap(y + t, this.height)][x] === "^") return false;

    return true;
  }

  pathFinder(startTime: number): number {
    const queue: [number, number, number][] = [
      [this.start.x, this.start.y, startTime],
    ];

    const visited = new Set<string>();

    const key = (x: number, y: number, t: number) =>
      `${x},${y},${t % this.period}`;

    visited.add(key(this.start.x, this.start.y, startTime));

    while (queue.length) {
      const [x, y, t] = queue.shift()!;

      if (x === this.end.x && y === this.end.y) {
        return t;
      }

      const nt = t + 1;

      for (const [dx, dy] of moves) {
        const nx = x + dx;
        const ny = y + dy;

        if (!this.isFree(nx, ny, nt)) continue;

        const k = key(nx, ny, nt);
        if (visited.has(k)) continue;

        visited.add(k);
        queue.push([nx, ny, nt]);
      }
    }

    throw new Error("No path found");
  }
}
