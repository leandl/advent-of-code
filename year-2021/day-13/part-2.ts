import {
  applyFold,
  Coordinate,
  FoldInstruction,
  TransparentPaper,
} from "./utils";

function applyAllFolds(
  coordinates: Coordinate[],
  folds: FoldInstruction[],
): Coordinate[] {
  return folds.reduce((current, fold) => applyFold(current, fold), coordinates);
}

function renderGrid(coordinates: Coordinate[]): string {
  const maxX = Math.max(...coordinates.map((p) => p.x));
  const maxY = Math.max(...coordinates.map((p) => p.y));

  const grid: string[][] = Array.from({ length: maxY + 1 }, () =>
    Array(maxX + 1).fill(" "),
  );

  for (const { x, y } of coordinates) {
    grid[y][x] = "#";
  }

  return "\n" + grid.map((row) => row.join("")).join("\n");
}

export function part2Run({ coordinates, foldInstructions }: TransparentPaper) {
  const finalCoordinates = applyAllFolds(coordinates, foldInstructions);
  return renderGrid(finalCoordinates);
}
