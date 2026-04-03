import { rambunctiousRecitation } from "./utils";

export function part2Run(startingNumbers: number[]): number {
  return rambunctiousRecitation(startingNumbers, 30_000_000);
}
