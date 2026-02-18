type Grid<T> = T[][];

export function part1Run(grid: Grid<number>) {
  if (grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;

  let riskSum = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const current = grid[row][col];

      const neighbors: number[] = [];

      if (row > 0) neighbors.push(grid[row - 1][col]);
      if (row < rows - 1) neighbors.push(grid[row + 1][col]);
      if (col > 0) neighbors.push(grid[row][col - 1]);
      if (col < cols - 1) neighbors.push(grid[row][col + 1]);

      if (neighbors.every((n) => current < n)) {
        riskSum += current + 1;
      }
    }
  }

  return riskSum;
}
