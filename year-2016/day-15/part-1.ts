import { Disc } from "./utils";

export function part1Run(discs: Disc[]) {
  let time = 0;
  let step = 1;

  for (let i = 0; i < discs.length; i++) {
    const { positions, startPosition } = discs[i];
    const discIndex = i + 1;

    while ((startPosition + time + discIndex) % positions !== 0) {
      time += step;
    }

    step *= positions;
  }

  return time;
}
