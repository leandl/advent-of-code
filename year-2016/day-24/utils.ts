import { Grid } from "../../utils/parsers";

type Position = { x: number; y: number };

export type RunParams = {
  grid: Grid<string>;
  points: Map<number, Position>;
};

export function parseGridAndPoints(lines: string[]): RunParams {
  const grid = lines.map((l) => l.split(""));
  const points = new Map<number, Position>();

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const c = grid[y][x];
      if (/\d/.test(c)) {
        points.set(Number(c), { x, y });
      }
    }
  }

  return { grid, points };
}

export function bfs(grid: string[][], start: Position): Map<string, number> {
  const q: [Position, number][] = [[start, 0]];
  const seen = new Set<string>([`${start.x},${start.y}`]);
  const dist = new Map<string, number>();

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (q.length) {
    const [p, d] = q.shift()!;
    const key = `${p.x},${p.y}`;
    dist.set(key, d);

    for (const [dx, dy] of dirs) {
      const nx = p.x + dx;
      const ny = p.y + dy;

      const k = `${nx},${ny}`;
      if (
        ny >= 0 &&
        ny < grid.length &&
        nx >= 0 &&
        nx < grid[0].length &&
        grid[ny][nx] !== "#" &&
        !seen.has(k)
      ) {
        seen.add(k);
        q.push([{ x: nx, y: ny }, d + 1]);
      }
    }
  }

  return dist;
}

export function permutations<T>(arr: T[]): T[][] {
  if (arr.length === 0) return [[]];

  const res: T[][] = [];

  arr.forEach((v, i) => {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const p of permutations(rest)) {
      res.push([v, ...p]);
    }
  });

  return res;
}
