export type IntcodeIO = {
  input: () => number;
  output: (value: number) => void;
};

export class IntcodeComputer {
  memory: number[];
  ip = 0;
  base = 0;
  halted = false;

  constructor(program: number[]) {
    this.memory = [...program, ...new Array(50_000).fill(0)];
  }

  isHalted() {
    return this.halted;
  }

  runUntilOutput(input: IntcodeIO["input"]): number | null {
    const mem = this.memory;

    while (!this.halted) {
      const instr = mem[this.ip];
      const op = instr % 100;

      const m1 = Math.floor(instr / 100) % 10;
      const m2 = Math.floor(instr / 1000) % 10;
      const m3 = Math.floor(instr / 10000) % 10;

      const p1 = mem[this.ip + 1];
      const p2 = mem[this.ip + 2];
      const p3 = mem[this.ip + 3];

      const v1 = m1 === 0 ? mem[p1] : m1 === 1 ? p1 : mem[this.base + p1];

      const v2 = m2 === 0 ? mem[p2] : m2 === 1 ? p2 : mem[this.base + p2];

      const a3 = m3 === 0 ? p3 : this.base + p3;

      switch (op) {
        case 1:
          mem[a3] = v1 + v2;
          this.ip += 4;
          break;

        case 2:
          mem[a3] = v1 * v2;
          this.ip += 4;
          break;

        case 3: {
          const addr = m1 === 0 ? p1 : this.base + p1;
          mem[addr] = input();
          this.ip += 2;
          break;
        }

        case 4:
          this.ip += 2;
          return v1;

        case 5:
          this.ip = v1 !== 0 ? v2 : this.ip + 3;
          break;

        case 6:
          this.ip = v1 === 0 ? v2 : this.ip + 3;
          break;

        case 7:
          mem[a3] = v1 < v2 ? 1 : 0;
          this.ip += 4;
          break;

        case 8:
          mem[a3] = v1 === v2 ? 1 : 0;
          this.ip += 4;
          break;

        case 9:
          this.base += v1;
          this.ip += 2;
          break;

        case 99:
          this.halted = true;
          return null;

        default:
          throw new Error("bad opcode " + op);
      }
    }

    return null;
  }

  // opcional (mantido compatível com sua API antiga)
  run(io: IntcodeIO): void {
    while (!this.halted) {
      const out = this.runUntilOutput(io.input);
      if (out !== null) {
        io.output(out);
      }
    }
  }
}
