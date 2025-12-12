import { canRegionFitAllGifts, parseElfPuzzle } from "./utils";

export function part1Run(lines: string[]): number {
  const { giftShapeGrids, treeRegionRequests } = parseElfPuzzle(lines);

  let validRegionCount = 0;

  for (const regionRequest of treeRegionRequests) {
    if (canRegionFitAllGifts(regionRequest, giftShapeGrids)) {
      validRegionCount++;
    }
  }

  return validRegionCount;
}
