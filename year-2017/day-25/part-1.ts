import { Machine } from "./utils";

export function part1Run(machine: Machine) {
  const tape = new Set<number>(); // guarda só posições com 1
  let cursor = 0;
  let state = machine.initialState;

  for (let step = 0; step < machine.steps; step++) {
    const currentValue = tape.has(cursor) ? 1 : 0;

    const rule = machine.states[state][currentValue];

    // write
    if (rule.write === 1) {
      tape.add(cursor);
    } else {
      tape.delete(cursor);
    }

    // move
    cursor += rule.move;

    // next state
    state = rule.next;
  }

  return tape.size;
}
