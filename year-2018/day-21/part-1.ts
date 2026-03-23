import { BoundProgram, ops, Registers } from "./utils";

export function part1Run({ instructions, ipRegister }: BoundProgram) {
  const registers: Registers = [0, 0, 0, 0, 0, 0];

  let ip = 0;

  while (ip >= 0 && ip < instructions.length) {
    registers[ipRegister] = ip;

    const { op, a, b, c } = instructions[ip];

    if (op === "eqrr") {
      const value = a === 0 ? registers[b] : registers[a];
      return value;
    }

    ops[op](registers, a, b, c);

    ip = registers[ipRegister];
    ip++;
  }

  throw new Error("Program did not halt");
}
