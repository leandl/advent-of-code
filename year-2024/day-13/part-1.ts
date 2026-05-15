import { Machine, solveMachine } from "./utils";

export function part1Run(machines: Machine[]) {
  let total = 0n;

  for (const m of machines) {
    const cost = solveMachine(m);
    if (cost !== null) {
      total += cost;
    }
  }

  return String(total);
}
