import { Disc } from "./utils";

export function part2Run(discs: Disc[]) {
  let time = 0;
  let step = 1;

  for (const disc of discs) {
    while ((disc.startPosition + time + disc.index) % disc.positions !== 0) {
      time += step;
    }

    step *= disc.positions;
  }

  return time;
}
