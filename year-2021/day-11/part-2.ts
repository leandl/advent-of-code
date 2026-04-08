import { Grid } from "../../utils/parsers";

export function part2Run(grid: Grid<number>) {
  const rows = grid.length;
  const cols = grid[0].length;
  const totalOctopus = rows * cols;

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

  let step = 0;

  while (true) {
    step++;

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
            hasNewFlash = true;

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

    // 3. Reset + count flashes
    let flashCount = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (flashed[r][c]) {
          grid[r][c] = 0;
          flashCount++;
        }
      }
    }

    if (flashCount === totalOctopus) {
      return step;
    }
  }
}
