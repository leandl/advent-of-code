import { Layer } from "./utils";

export function part1Run(layers: Layer[]) {
  let severity = 0;

  for (const { depth, range } of layers) {
    const period = 2 * (range - 1);

    if (depth % period === 0) {
      severity += depth * range;
    }
  }

  return severity;
}
