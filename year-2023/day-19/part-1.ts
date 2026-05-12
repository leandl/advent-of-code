import { PuzzleData, isPartAccepted } from "./utils";

export function part1Run({ machineParts, workflowMap }: PuzzleData) {
  let totalRatingSum = 0;

  for (const part of machineParts) {
    if (isPartAccepted(part, workflowMap)) {
      totalRatingSum += part.x + part.m + part.a + part.s;
    }
  }

  return totalRatingSum;
}
