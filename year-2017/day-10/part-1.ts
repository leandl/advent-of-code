import { knot } from "./utils";

export function part1Run(lengths: number[]) {
  const list = knot(lengths);

  return list[0] * list[1];
}
