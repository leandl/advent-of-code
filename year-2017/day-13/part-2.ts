import { Layer } from "./utils";

export function part2Run(layers: Layer[]) {
  let delay = 0;

  while (true) {
    let caught = false;

    for (const { depth, range } of layers) {
      const period = 2 * (range - 1);

      if ((delay + depth) % period === 0) {
        caught = true;
        break;
      }
    }

    if (!caught) return delay;

    delay++;
  }
}
