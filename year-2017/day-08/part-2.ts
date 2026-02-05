import { evaluateCondition, Instruction } from "./utils";

export function part2Run(instructions: Instruction[]) {
  const registers = new Map<string, number>();

  let maxEver = 0;

  const get = (reg: string) => registers.get(reg) ?? 0;
  const set = (reg: string, value: number) => {
    registers.set(reg, value);
    if (value > maxEver) {
      maxEver = value;
    }
  };

  for (const instr of instructions) {
    const condLeft = get(instr.conditionRegister);

    if (
      evaluateCondition(condLeft, instr.conditionOperator, instr.conditionValue)
    ) {
      const current = get(instr.target);
      const delta = instr.operation === "inc" ? instr.amount : -instr.amount;

      set(instr.target, current + delta);
    }
  }

  return maxEver;
}
