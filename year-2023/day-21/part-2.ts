import { Grid } from "../../utils/parsers";
import { Position } from "./utils";

export function part2Run(grid: Grid<string>) {
  const size = grid.length;

  let start: Position = { r: 0, c: 0 };

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === "S") {
        start = { r, c };
      }
    }
  }

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function bfs(steps: number): number {
    let current = new Set<string>();
    current.add(`${start.r},${start.c}`);

    for (let s = 0; s < steps; s++) {
      const next = new Set<string>();

      for (const pos of current) {
        const [r, c] = pos.split(",").map(Number);

        for (const [dr, dc] of dirs) {
          let nr = r + dr;
          let nc = c + dc;

          // infinite tiling (wrap)
          let tr = ((nr % size) + size) % size;
          let tc = ((nc % size) + size) % size;

          if (grid[tr][tc] !== "#") {
            next.add(`${nr},${nc}`);
          }
        }
      }

      current = next;
    }

    return current.size;
  }

  const target = 26501365;
  const offset = target % size;

  const y0 = bfs(offset);
  const y1 = bfs(offset + size);
  const y2 = bfs(offset + 2 * size);

  // interpolação quadrática
  const a = (y2 - 2 * y1 + y0) / 2;
  const b = y1 - y0 - a;
  const c = y0;

  const k = Math.floor(target / size);

  return a * k * k + b * k + c;
}
