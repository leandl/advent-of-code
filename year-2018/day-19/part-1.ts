import { BoundProgram, ops, Registers } from "./utils";

export function part1Run({ instructions, ipRegister }: BoundProgram) {
  const registers: Registers = [0, 0, 0, 0, 0, 0];

  let ip = 0;

  while (ip >= 0 && ip < instructions.length) {
    registers[ipRegister] = ip;

    const { op, a, b, c } = instructions[ip];

    ops[op](registers, a, b, c);

    ip = registers[ipRegister];

    ip++;
  }

  return registers[0];
}
