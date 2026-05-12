import { countAcceptedCombinations, PuzzleData } from "./utils";

export function part2Run({ workflowMap }: PuzzleData) {
  return countAcceptedCombinations(workflowMap);
}
