import { canForkliftAccessRoll } from "./utils";

export function part1Run(grid: string[]) {
  let accessibleCount = 0;

  for (let row = 0; row < grid.length; row++) {
    const rowContent = grid[row];

    for (let col = 0; col < rowContent.length; col++) {
      if (canForkliftAccessRoll(grid, { x: col, y: row })) {
        accessibleCount++;
      }
    }
  }

  return accessibleCount;
}
