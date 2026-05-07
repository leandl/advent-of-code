import { Grid, parseGrid } from "../../utils/parsers";

export function parseGrids(input: string): Grid<string>[] {
  return input
    .trim()
    .split("\n\n")
    .map((block) => parseGrid(block.split("\n")));
}

function isVerticalReflection(
  grid: Grid<string>,
  col: number,
  allowedDiffs: number,
): boolean {
  const width = grid[0].length;
  const height = grid.length;

  let left = col - 1;
  let right = col;
  let diffs = 0;

  while (left >= 0 && right < width) {
    for (let row = 0; row < height; row++) {
      if (grid[row][left] !== grid[row][right]) {
        diffs++;
        if (diffs > allowedDiffs) return false;
      }
    }
    left--;
    right++;
  }

  return diffs === allowedDiffs;
}

function isHorizontalReflection(
  grid: Grid<string>,
  rowSplit: number,
  allowedDiffs: number,
): boolean {
  const height = grid.length;
  const width = grid[0].length;

  let top = rowSplit - 1;
  let bottom = rowSplit;
  let diffs = 0;

  while (top >= 0 && bottom < height) {
    for (let col = 0; col < width; col++) {
      if (grid[top][col] !== grid[bottom][col]) {
        diffs++;
        if (diffs > allowedDiffs) return false;
      }
    }
    top--;
    bottom++;
  }

  return diffs === allowedDiffs;
}

export function run(grids: Grid<string>[], allowedDiffs: number) {
  let total = 0;

  for (const grid of grids) {
    const height = grid.length;
    const width = grid[0].length;

    let found = false;

    // Vertical
    for (let col = 1; col < width; col++) {
      if (isVerticalReflection(grid, col, allowedDiffs)) {
        total += col;
        found = true;
        break;
      }
    }

    if (found) continue;

    // Horizontal
    for (let row = 1; row < height; row++) {
      if (isHorizontalReflection(grid, row, allowedDiffs)) {
        total += row * 100;
        break;
      }
    }
  }

  return total;
}
