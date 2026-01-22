import { directions, GridNumber, parseGridNumber, Point } from "./utils";

function trailheadScore(grid: GridNumber, start: Point): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const reachedNines = new Set<string>();

  function dfs(r: number, c: number) {
    const currentHeight = grid[r][c];

    if (currentHeight === 9) {
      reachedNines.add(`${r},${c}`);
      return;
    }

    for (const d of directions) {
      const nr = r + d.r;
      const nc = c + d.c;

      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        grid[nr][nc] === currentHeight + 1
      ) {
        dfs(nr, nc);
      }
    }
  }

  dfs(start.r, start.c);
  return reachedNines.size;
}

export function part1Run(lines: string[]) {
  const grid = parseGridNumber(lines);
  let total = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 0) {
        total += trailheadScore(grid, { r, c });
      }
    }
  }

  return total;
}
