import { findMinimumEnergy, parseState, unfoldInput } from "./utlts";

export function part2Run(lines: string[]) {
  return findMinimumEnergy(parseState(unfoldInput(lines)));
}
