import { BoundProgram, Registers } from "./utils";

export function part2Run({ instructions, ipRegister }: BoundProgram) {
  const r: Registers = [0, 0, 0, 0, 0, 0];

  let ip = 0;

  const seen = new Set<number>();
  let last = 0;

  while (ip >= 0 && ip < instructions.length) {
    r[ipRegister] = ip;

    const instr = instructions[ip];
    if (instr.op === "eqrr") {
      const value = instr.a === 0 ? r[instr.b] : r[instr.a];

      if (seen.has(value)) return last;

      seen.add(value);
      last = value;
    }

    switch (instr.op) {
      case "addr":
        r[instr.c] = r[instr.a] + r[instr.b];
        break;
      case "addi":
        r[instr.c] = r[instr.a] + instr.b;
        break;
      case "mulr":
        r[instr.c] = r[instr.a] * r[instr.b];
        break;
      case "muli":
        r[instr.c] = r[instr.a] * instr.b;
        break;
      case "banr":
        r[instr.c] = r[instr.a] & r[instr.b];
        break;
      case "bani":
        r[instr.c] = r[instr.a] & instr.b;
        break;
      case "borr":
        r[instr.c] = r[instr.a] | r[instr.b];
        break;
      case "bori":
        r[instr.c] = r[instr.a] | instr.b;
        break;
      case "setr":
        r[instr.c] = r[instr.a];
        break;
      case "seti":
        r[instr.c] = instr.a;
        break;
      case "gtir":
        r[instr.c] = instr.a > r[instr.b] ? 1 : 0;
        break;
      case "gtri":
        r[instr.c] = r[instr.a] > instr.b ? 1 : 0;
        break;
      case "gtrr":
        r[instr.c] = r[instr.a] > r[instr.b] ? 1 : 0;
        break;
      case "eqir":
        r[instr.c] = instr.a === r[instr.b] ? 1 : 0;
        break;
      case "eqri":
        r[instr.c] = r[instr.a] === instr.b ? 1 : 0;
        break;
      case "eqrr":
        r[instr.c] = r[instr.a] === r[instr.b] ? 1 : 0;
        break;
    }

    ip = r[ipRegister] + 1;
  }

  throw new Error("Program did not halt");
}
