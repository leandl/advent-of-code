import { canForkliftAccessRoll } from "./utils";

const REMOVED_SYMBOL = "X";

function markAccessibleRollsForRemoval(grid: string[]): string[] {
  return grid.map((row, y) =>
    row
      .split("")
      .map((char, x) =>
        canForkliftAccessRoll(grid, { x, y }) ? REMOVED_SYMBOL : char
      )
      .join("")
  );
}

function removeRollsIteratively(initialGrid: string[]): string[] {
  let current = initialGrid;
  let next = markAccessibleRollsForRemoval(current);

  while (current.join("") !== next.join("")) {
    current = next;
    next = markAccessibleRollsForRemoval(current);
  }

  return next;
}

export function part2Run(lines: string[]) {
  const finalGrid = removeRollsIteratively(lines);

  let removedCount = 0;
  for (const row of finalGrid) {
    for (const char of row) {
      if (char === REMOVED_SYMBOL) {
        removedCount++;
      }
    }
  }

  return removedCount;
}
