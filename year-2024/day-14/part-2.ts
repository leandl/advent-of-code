import { getPositions, getVariance, Robot } from "./utils";

export function part2Run(robots: Robot[]) {
  const W = 101;
  const H = 103;

  let bestTime = 0;
  let bestScore = Infinity;

  for (let t = 0; t < 30000; t++) {
    const positions = getPositions(robots, t, W, H);
    const score = getVariance(positions);

    if (score < bestScore) {
      bestScore = score;
      bestTime = t;
    }
  }

  return bestTime;
}
