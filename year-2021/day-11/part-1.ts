import { Grid } from "../../utils/parsers";

export function part1Run(grid: Grid<number>) {
  const steps = 100;
  const rows = grid.length;
  const cols = grid[0].length;

  let totalFlashes = 0;

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let step = 0; step < steps; step++) {
    const flashed: boolean[][] = Array.from({ length: rows }, () =>
      Array(cols).fill(false),
    );

    // 1. Increase all by 1
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        grid[r][c]++;
      }
    }

    // 2. Process flashes
    let hasNewFlash = true;

    while (hasNewFlash) {
      hasNewFlash = false;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r][c] > 9 && !flashed[r][c]) {
            flashed[r][c] = true;
            totalFlashes++;
            hasNewFlash = true;

            // Increase neighbors
            for (const [dr, dc] of directions) {
              const nr = r + dr;
              const nc = c + dc;

              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                grid[nr][nc]++;
              }
            }
          }
        }
      }
    }

    // 3. Reset flashed to 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (flashed[r][c]) {
          grid[r][c] = 0;
        }
      }
    }
  }

  return totalFlashes;
}
