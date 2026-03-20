import {
  cloneRegisters,
  equalRegisters,
  operations,
  ChronalProgramInput,
} from "./utils";

export function part1Run({ samples }: ChronalProgramInput) {
  let count = 0;

  for (const { before, instruction, after } of samples) {
    const [, a, b, c] = instruction;

    let matches = 0;

    for (const op of Object.values(operations)) {
      const regs = cloneRegisters(before);

      op(regs, a, b, c);

      if (equalRegisters(regs, after)) {
        matches++;
      }
    }

    if (matches >= 3) {
      count++;
    }
  }

  return count;
}
