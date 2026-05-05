import { Blueprint, maxGeodes } from "./utils";

export function part2Run(blueprints: Blueprint[]) {
  const firstThree = blueprints.slice(0, 3);

  let result = 1;

  for (const bp of firstThree) {
    const best = maxGeodes(bp, 32);
    result *= best;
  }

  return result;
}
