import { Race } from "./utils";

export function countWinningWays({ time, recordDistance }: Race): number {
  let count = 0;

  for (let hold = 0; hold <= time; hold++) {
    const distance = hold * (time - hold);
    if (distance > recordDistance) {
      count++;
    }
  }

  return count;
}

export function part1Run(races: Race[]) {
  return races.map(countWinningWays).reduce((acc, value) => acc * value, 1);
}
