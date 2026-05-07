import { Grid } from "../../utils/parsers";
import { calculateLoad, serialize, tiltCycle } from "./utils";

export function part2Run(initial: Grid<string>) {
  const seen = new Map<string, number>();
  const states: Grid<string>[] = [];

  let grid = initial.map((r) => [...r]);
  let step = 0;
  const TOTAL = 1_000_000_000;

  while (step < TOTAL) {
    const key = serialize(grid);

    if (seen.has(key)) {
      const cycleStart = seen.get(key)!;
      const cycleLength = step - cycleStart;

      const remaining = (TOTAL - cycleStart) % cycleLength;

      return calculateLoad(states[cycleStart + remaining]);
    }

    seen.set(key, step);
    states.push(grid.map((r) => [...r]));

    grid = tiltCycle(grid);
    step++;
  }

  return calculateLoad(grid);
}
