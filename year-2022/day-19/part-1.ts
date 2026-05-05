import { Blueprint, maxGeodes } from "./utils";

export function part1Run(blueprints: Blueprint[]) {
  let total = 0;

  for (const bp of blueprints) {
    const best = maxGeodes(bp, 24);
    total += best * bp.id;
  }

  return total;
}
