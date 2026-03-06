import { Instruction, Register, val } from "./utils";

export function part1Run(program: Instruction[]) {
  for (let startA = 1; ; startA++) {
    const reg: Record<Register, number> = { a: startA, b: 0, c: 0, d: 0 };

    let ip = 0;
    let expected = 0;
    let produced = 0;

    while (ip >= 0 && ip < program.length && produced < 100) {
      const ins = program[ip];

      switch (ins.op) {
        case "cpy":
          reg[ins.y] = val(ins.x, reg);
          ip++;
          break;

        case "inc":
          reg[ins.x]++;
          ip++;
          break;

        case "dec":
          reg[ins.x]--;
          ip++;
          break;

        case "jnz":
          if (val(ins.x, reg) !== 0) {
            ip += val(ins.y, reg);
          } else {
            ip++;
          }
          break;

        case "out": {
          const v = val(ins.x, reg);

          if (v !== expected) {
            ip = Infinity; // falha no padrão
            break;
          }

          expected = 1 - expected;
          produced++;
          ip++;
          break;
        }
      }
    }

    if (produced === 100) return startA;
  }
}
