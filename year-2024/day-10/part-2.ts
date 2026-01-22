import { directions, GridNumber, parseGridNumber, Point } from "./utils";

function trailheadRating(grid: GridNumber, start: Point): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const memo = new Map<string, number>();

  function dfs(r: number, c: number): number {
    const key = `${r},${c}`;
    if (memo.has(key)) {
      return memo.get(key)!;
    }

    const height = grid[r][c];

    // Base: chegou a um 9 → uma trilha válida
    if (height === 9) {
      return 1;
    }

    let totalPaths = 0;

    for (const d of directions) {
      const nr = r + d.r;
      const nc = c + d.c;

      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        grid[nr][nc] === height + 1
      ) {
        totalPaths += dfs(nr, nc);
      }
    }

    memo.set(key, totalPaths);
    return totalPaths;
  }

  return dfs(start.r, start.c);
}

export function part2Run(lines: string[]) {
  const grid = parseGridNumber(lines);
  let total = 0;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 0) {
        total += trailheadRating(grid, { r, c });
      }
    }
  }

  return total;
}
