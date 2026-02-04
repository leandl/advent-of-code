import { Race } from "./utils";

export function part2Run({ time, recordDistance }: Race) {
  const discriminant = time * time - 4 * recordDistance;

  const sqrt = Math.sqrt(discriminant);

  const t1 = (time - sqrt) / 2;
  const t2 = (time + sqrt) / 2;

  const minHold = Math.floor(t2 - 1e-9);
  const maxHold = Math.ceil(t1 + 1e-9);

  return Math.max(0, minHold - maxHold + 1);
}
