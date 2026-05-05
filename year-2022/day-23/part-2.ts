import { findFirstStableRound } from "./utils";

export function part2Run(elves: Set<string>) {
  return findFirstStableRound(elves);
}
