import { Grid } from "../../utils/parsers";
import { Point } from "./utils";

const DIRS: Record<string, Point[]> = {
  ".": [
    { r: -1, c: 0 },
    { r: 1, c: 0 },
    { r: 0, c: -1 },
    { r: 0, c: 1 },
  ],
  "^": [{ r: -1, c: 0 }],
  v: [{ r: 1, c: 0 }],
  "<": [{ r: 0, c: -1 }],
  ">": [{ r: 0, c: 1 }],
};

export function part1Run(grid: Grid<string>) {
  const R = grid.length;
  const C = grid[0].length;

  // Encontrar início (primeiro "." na primeira linha)
  let start: Point = { r: 0, c: 0 };
  for (let c = 0; c < C; c++) {
    if (grid[0][c] === ".") {
      start = { r: 0, c };
      break;
    }
  }

  // Encontrar fim (último "." na última linha)
  let end: Point = { r: R - 1, c: 0 };
  for (let c = 0; c < C; c++) {
    if (grid[R - 1][c] === ".") {
      end = { r: R - 1, c };
      break;
    }
  }

  const visited = new Set<string>();
  let best = 0;

  function key(p: Point) {
    return `${p.r},${p.c}`;
  }

  function dfs(r: number, c: number, steps: number) {
    if (r === end.r && c === end.c) {
      best = Math.max(best, steps);
      return;
    }

    const k = key({ r, c });
    visited.add(k);

    const tile = grid[r][c];
    const moves = DIRS[tile] ?? [];

    for (const d of moves) {
      const nr = r + d.r;
      const nc = c + d.c;

      if (nr < 0 || nr >= R || nc < 0 || nc >= C || grid[nr][nc] === "#")
        continue;

      const nk = `${nr},${nc}`;
      if (visited.has(nk)) continue;

      dfs(nr, nc, steps + 1);
    }

    visited.delete(k);
  }

  dfs(start.r, start.c, 0);
  return best;
}
