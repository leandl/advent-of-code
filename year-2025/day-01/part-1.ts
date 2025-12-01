import { getDirectionAndSteps } from "./utils";

export function part1Run(lines: string[]) {
  let zeroHitCount = 0;
  let dialPosition = 50;

  for (const [direction, steps] of getDirectionAndSteps(lines)) {
    if (direction === "R") {
      dialPosition = (dialPosition + steps) % 100;
    } else {
      dialPosition = (100 + dialPosition - steps) % 100;
    }

    if (dialPosition === 0) {
      zeroHitCount += 1;
    }
  }

  return zeroHitCount;
}
