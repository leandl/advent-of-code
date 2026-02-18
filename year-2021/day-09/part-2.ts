import { Grid } from "../../utils/parsers";

export function part2Run(grid: Grid<number>): number {
  if (grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;

  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false),
  );

  const basinSizes: number[] = [];

  function isLowPoint(row: number, col: number): boolean {
    const current = grid[row][col];
    const neighbors: number[] = [];

    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < rows - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < cols - 1) neighbors.push(grid[row][col + 1]);

    return neighbors.every((n) => current < n);
  }

  function dfs(row: number, col: number): number {
    // Fora do grid
    if (row < 0 || row >= rows || col < 0 || col >= cols) return 0;

    // Já visitado ou altura 9
    if (visited[row][col] || grid[row][col] === 9) return 0;

    visited[row][col] = true;

    let size = 1;

    size += dfs(row - 1, col);
    size += dfs(row + 1, col);
    size += dfs(row, col - 1);
    size += dfs(row, col + 1);

    return size;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (isLowPoint(row, col)) {
        const basinSize = dfs(row, col);
        basinSizes.push(basinSize);
      }
    }
  }

  basinSizes.sort((a, b) => b - a);

  return basinSizes[0] * basinSizes[1] * basinSizes[2];
}
