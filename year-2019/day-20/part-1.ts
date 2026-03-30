import { Grid } from "../../utils/parsers";
import { DIRS, isLetter } from "./utils";

type Point = { x: number; y: number };

function key(p: Point): string {
  return `${p.x},${p.y}`;
}

export function part1Run(grid: Grid<string>) {
  const height = grid.length;
  const width = grid[0].length;

  const portals = new Map<string, Point[]>();

  function addPortal(name: string, p: Point) {
    if (!portals.has(name)) portals.set(name, []);
    portals.get(name)!.push(p);
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!isLetter(grid[y][x])) continue;

      // horizontal label
      if (x + 1 < width && isLetter(grid[y][x + 1])) {
        const name = grid[y][x] + grid[y][x + 1];

        if (x - 1 >= 0 && grid[y][x - 1] === ".") {
          addPortal(name, { x: x - 1, y });
        } else if (x + 2 < width && grid[y][x + 2] === ".") {
          addPortal(name, { x: x + 2, y });
        }
      }

      // vertical label
      if (y + 1 < height && isLetter(grid[y + 1][x])) {
        const name = grid[y][x] + grid[y + 1][x];

        if (y - 1 >= 0 && grid[y - 1][x] === ".") {
          addPortal(name, { x, y: y - 1 });
        } else if (y + 2 < height && grid[y + 2][x] === ".") {
          addPortal(name, { x, y: y + 2 });
        }
      }
    }
  }

  const start = portals.get("AA")![0];
  const end = portals.get("ZZ")![0];

  const portalLinks = new Map<string, Point>();

  for (const [name, pts] of portals.entries()) {
    if (pts.length === 2) {
      portalLinks.set(key(pts[0]), pts[1]);
      portalLinks.set(key(pts[1]), pts[0]);
    }
  }

  const queue: [Point, number][] = [[start, 0]];
  const visited = new Set<string>([key(start)]);

  while (queue.length > 0) {
    const [cur, dist] = queue.shift()!;

    if (cur.x === end.x && cur.y === end.y) {
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
        const k = key({ x: nx, y: ny });
        if (!visited.has(k)) {
          visited.add(k);
          queue.push([{ x: nx, y: ny }, dist + 1]);
        }
      }
    }

    // teleporte
    const k = key(cur);
    if (portalLinks.has(k)) {
      const dest = portalLinks.get(k)!;
      const dk = key(dest);

      if (!visited.has(dk)) {
        visited.add(dk);
        queue.push([dest, dist + 1]);
      }
    }
  }

  return -1;
}
