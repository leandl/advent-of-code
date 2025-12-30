import { getVisitedPositions, parseGrid } from "./utils";

export function part1Run(lines: string[]): number {
  const grid = parseGrid(lines);
  const visitedPositions = getVisitedPositions(grid);

  return visitedPositions.size;
}
