import { Grid } from "../../utils/parsers";
import { DIRS, isLetter } from "./utils";

type Point = {
  x: number;
  y: number;
  level: number;
};

function key(p: Point): string {
  return `${p.x},${p.y},${p.level}`;
}

export function part2Run(grid: Grid<string>): number {
  const height = grid.length;
  const width = grid[0].length;

  const portals = new Map<string, { x: number; y: number; outer: boolean }[]>();

  function addPortal(name: string, x: number, y: number) {
    const outer = x <= 2 || y <= 2 || x >= width - 3 || y >= height - 3;

    if (!portals.has(name)) portals.set(name, []);
    portals.get(name)!.push({ x, y, outer });
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!isLetter(grid[y][x])) continue;

      // horizontal
      if (x + 1 < width && isLetter(grid[y][x + 1])) {
        const name = grid[y][x] + grid[y][x + 1];

        if (x - 1 >= 0 && grid[y][x - 1] === ".") {
          addPortal(name, x - 1, y);
        } else if (x + 2 < width && grid[y][x + 2] === ".") {
          addPortal(name, x + 2, y);
        }
      }

      // vertical
      if (y + 1 < height && isLetter(grid[y + 1][x])) {
        const name = grid[y][x] + grid[y + 1][x];

        if (y - 1 >= 0 && grid[y - 1][x] === ".") {
          addPortal(name, x, y - 1);
        } else if (y + 2 < height && grid[y + 2][x] === ".") {
          addPortal(name, x, y + 2);
        }
      }
    }
  }

  const start = portals.get("AA")![0];
  const end = portals.get("ZZ")![0];

  const portalLinks = new Map<
    string,
    { x: number; y: number; levelDelta: number }
  >();

  for (const [name, pts] of portals.entries()) {
    if (name === "AA" || name === "ZZ") continue;
    if (pts.length !== 2) continue;

    const [a, b] = pts;

    // outer -> level -1
    // inner -> level +1
    portalLinks.set(`${a.x},${a.y}`, {
      x: b.x,
      y: b.y,
      levelDelta: a.outer ? -1 : +1,
    });

    portalLinks.set(`${b.x},${b.y}`, {
      x: a.x,
      y: a.y,
      levelDelta: b.outer ? -1 : +1,
    });
  }

  const queue: [Point, number][] = [[{ x: start.x, y: start.y, level: 0 }, 0]];

  const visited = new Set<string>([key({ x: start.x, y: start.y, level: 0 })]);

  while (queue.length > 0) {
    const [cur, dist] = queue.shift()!;

    if (cur.x === end.x && cur.y === end.y && cur.level === 0) {
      return dist;
    }

    // andar normal
    for (const d of DIRS) {
      const nx = cur.x + d.x;
      const ny = cur.y + d.y;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < width &&
        ny < height &&
        grid[ny][nx] === "."
      ) {
        const next = { x: nx, y: ny, level: cur.level };
        const k = key(next);

        if (!visited.has(k)) {
          visited.add(k);
          queue.push([next, dist + 1]);
        }
      }
    }

    // teleporte
    const k2 = `${cur.x},${cur.y}`;
    if (portalLinks.has(k2)) {
      const link = portalLinks.get(k2)!;

      const newLevel = cur.level + link.levelDelta;

      if (newLevel >= 0) {
        const next = { x: link.x, y: link.y, level: newLevel };
        const k = key(next);

        if (!visited.has(k)) {
          visited.add(k);
          queue.push([next, dist + 1]);
        }
      }
    }
  }

  return -1;
}
