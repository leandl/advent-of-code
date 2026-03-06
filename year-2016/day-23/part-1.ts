import { Instruction, isRegister, Register, toggle, val } from "./utils";

export function part1Run(program: Instruction[], initialA = 7): number {
  const reg: Record<Register, number> = {
    a: initialA,
    b: 0,
    c: 0,
    d: 0,
  };

  let ip = 0;

  while (ip < program.length) {
    const inst = program[ip];

    switch (inst.op) {
      case "cpy":
        if (isRegister(inst.y)) {
          reg[inst.y] = val(inst.x, reg);
        }
        ip++;
        break;

      case "inc":
        if (isRegister(inst.x)) reg[inst.x]++;
        ip++;
        break;

      case "dec":
        if (isRegister(inst.x)) reg[inst.x]--;
        ip++;
        break;

      case "jnz":
        if (val(inst.x, reg) !== 0) {
          ip += val(inst.y, reg);
        } else {
          ip++;
        }
        break;

      case "tgl": {
        const target = ip + val(inst.x, reg);

        if (target >= 0 && target < program.length) {
          program[target] = toggle(program[target]);
        }

        ip++;
        break;
      }
    }
  }

  return reg.a;
}
