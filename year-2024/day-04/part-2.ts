function countXMAS_XShape(grid: string[]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  let count = 0;

  function isMAS(a: string, b: string, c: string): boolean {
    return (
      (a === "M" && b === "A" && c === "S") ||
      (a === "S" && b === "A" && c === "M")
    );
  }

  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      if (grid[r][c] !== "A") continue;

      const tl = grid[r - 1][c - 1]; // ↖
      const tr = grid[r - 1][c + 1]; // ↗
      const bl = grid[r + 1][c - 1]; // ↙
      const br = grid[r + 1][c + 1]; // ↘

      const diag1 = isMAS(tl, "A", br);
      const diag2 = isMAS(tr, "A", bl);

      if (diag1 && diag2) {
        count++;
      }
    }
  }

  return count;
}

export function part2Run(lines: string[]): number {
  return countXMAS_XShape(lines);
}
