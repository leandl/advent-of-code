import { Direction, getGrid, isScaffold, move, Position } from "./utils";

export function part1Run(program: number[]): number {
  const grid = getGrid(program);

  function isIntersection(pos: Position): boolean {
    if (!isScaffold(grid, pos)) return false;

    return Object.values(Direction)
      .filter((d) => typeof d === "number")
      .every((dir) => isScaffold(grid, move(pos, dir as Direction)));
  }

  let sum = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const pos = { x, y };

      if (isIntersection(pos)) {
        sum += x * y;
      }
    }
  }

  return sum;
}
