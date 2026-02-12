import { Grid } from "../../utils/parsers";

export function part2Run(grid: Grid<number>) {
  const rows = grid.length;
  const cols = grid[0].length;

  let maxScore = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const height = grid[row][col];

      // -------- UP --------
      let up = 0;
      for (let r = row - 1; r >= 0; r--) {
        up++;
        if (grid[r][col] >= height) break;
      }

      // -------- DOWN --------
      let down = 0;
      for (let r = row + 1; r < rows; r++) {
        down++;
        if (grid[r][col] >= height) break;
      }

      // -------- LEFT --------
      let left = 0;
      for (let c = col - 1; c >= 0; c--) {
        left++;
        if (grid[row][c] >= height) break;
      }

      // -------- RIGHT --------
      let right = 0;
      for (let c = col + 1; c < cols; c++) {
        right++;
        if (grid[row][c] >= height) break;
      }

      const score = up * down * left * right;
      maxScore = Math.max(maxScore, score);
    }
  }

  return maxScore;
}
