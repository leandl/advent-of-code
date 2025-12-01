import { getDirectionAndSteps } from "./utils";

export function part2Run(lines: string[]) {
  let zeroHitCount = 0;
  let dialPosition = 50;

  for (const [direction, stepCount] of getDirectionAndSteps(lines)) {
    const movementDelta = direction === "L" ? -1 : 1;

    for (let i = 0; i < stepCount; i++) {
      dialPosition += movementDelta;

      if (dialPosition === 100) {
        dialPosition = 0;
      } else if (dialPosition === -1) {
        dialPosition = 99;
      }

      if (dialPosition === 0) {
        zeroHitCount += 1;
      }
    }
  }

  return zeroHitCount;
}
