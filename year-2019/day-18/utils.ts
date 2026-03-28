import { Grid } from "../../utils/parsers";

export type Position = { x: number; y: number };

function isKey(c: string) {
  return c >= "a" && c <= "z";
}

function isDoor(c: string) {
  return c >= "A" && c <= "Z";
}

function bfsFrom(grid: Grid<string>, sx: number, sy: number) {
  const queue = [{ x: sx, y: sy, dist: 0, req: 0 }];
  const visited = new Set<string>();
  const result: Record<string, { dist: number; req: number }> = {};

  const dirs = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];

  while (queue.length) {
    const { x, y, dist, req } = queue.shift()!;
    const key = `${x},${y}`;

    if (visited.has(key)) continue;
    visited.add(key);

    const cell = grid[y][x];

    if (isKey(cell)) {
      result[cell] = { dist, req };
    }

    let newReq = req;
    if (isDoor(cell)) {
      newReq |= 1 << (cell.charCodeAt(0) - 65);
    }

    for (const { dx, dy } of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (grid[ny]?.[nx] !== "#") {
        queue.push({ x: nx, y: ny, dist: dist + 1, req: newReq });
      }
    }
  }

  return result;
}

export function buildGraph(grid: Grid<string>, robots: Position[]) {
  const points: Record<string, Position> = {};

  robots.forEach((r, i) => {
    points[`@${i}`] = r;
  });

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const c = grid[y][x];
      if (isKey(c)) {
        points[c] = { x, y };
      }
    }
  }

  const graph: Record<string, any> = {};

  for (const k in points) {
    const { x, y } = points[k];
    graph[k] = bfsFrom(grid, x, y);
  }

  return graph;
}

export function splitMap(grid: Grid<string>): Position[] {
  let sx = 0,
    sy = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "@") {
        sx = x;
        sy = y;
      }
    }
  }

  // transforma
  grid[sy][sx] = "#";
  grid[sy - 1][sx] = "#";
  grid[sy + 1][sx] = "#";
  grid[sy][sx - 1] = "#";
  grid[sy][sx + 1] = "#";

  const robots = [
    { x: sx - 1, y: sy - 1 },
    { x: sx + 1, y: sy - 1 },
    { x: sx - 1, y: sy + 1 },
    { x: sx + 1, y: sy + 1 },
  ];

  for (const r of robots) {
    grid[r.y][r.x] = "@";
  }

  return robots;
}
