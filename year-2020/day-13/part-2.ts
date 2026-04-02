import { ScheduleConstraints } from "./utils";

export function part2Run(constraints: ScheduleConstraints) {
  let timestamp = 0n;
  let step = 1n;

  for (const { id, offset } of constraints) {
    // encontrar t que satisfaça a nova restrição
    while ((timestamp + offset) % id !== 0n) {
      timestamp += step;
    }

    // garantir que futuras iterações respeitem todas anteriores
    step *= id;
  }

  return String(timestamp);
}
