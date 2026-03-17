import { Instruction, Registers, setRegister, getValue } from "./utils";

export function part1Run(instructions: Instruction[]) {
  const registers: Registers = {};

  let ip = 0;
  let mulCount = 0;

  while (ip >= 0 && ip < instructions.length) {
    const instr = instructions[ip];

    switch (instr.op) {
      case "set":
        setRegister(registers, instr.x, getValue(registers, instr.y));
        break;

      case "sub":
        setRegister(
          registers,
          instr.x,
          getValue(registers, instr.x) - getValue(registers, instr.y),
        );

        break;

      case "mul":
        setRegister(
          registers,
          instr.x,
          getValue(registers, instr.x) * getValue(registers, instr.y),
        );
        mulCount++;
        break;

      case "jnz":
        if (getValue(registers, instr.x) !== 0) {
          ip += getValue(registers, instr.y);
          continue;
        }
        break;
    }

    ip++;
  }

  return mulCount;
}
