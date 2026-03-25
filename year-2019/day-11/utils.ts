export type IntcodeIO = {
  input: () => number;
  output: (value: number) => void;
};

export class IntcodeComputer {
  memory: Map<number, number>;
  ip = 0;
  relativeBase = 0;
  halted = false;

  constructor(program: number[]) {
    this.memory = new Map();
    program.forEach((v, i) => this.memory.set(i, v));
  }

  get(addr: number): number {
    return this.memory.get(addr) ?? 0;
  }

  set(addr: number, value: number) {
    this.memory.set(addr, value);
  }

  run(io: IntcodeIO) {
    while (!this.halted) {
      const instr = this.get(this.ip);
      const opcode = instr % 100;
      const modes = Math.floor(instr / 100);

      const getParam = (n: number) => {
        const mode = Math.floor(modes / Math.pow(10, n - 1)) % 10;
        const val = this.get(this.ip + n);

        if (mode === 0) return this.get(val);
        if (mode === 1) return val;
        if (mode === 2) return this.get(this.relativeBase + val);
        throw new Error("invalid mode");
      };

      const getAddr = (n: number) => {
        const mode = Math.floor(modes / Math.pow(10, n - 1)) % 10;
        const val = this.get(this.ip + n);

        if (mode === 0) return val;
        if (mode === 2) return this.relativeBase + val;
        throw new Error("invalid addr mode");
      };

      switch (opcode) {
        case 1:
          this.set(getAddr(3), getParam(1) + getParam(2));
          this.ip += 4;
          break;
        case 2:
          this.set(getAddr(3), getParam(1) * getParam(2));
          this.ip += 4;
          break;
        case 3:
          this.set(getAddr(1), io.input());
          this.ip += 2;
          break;
        case 4:
          io.output(getParam(1));
          this.ip += 2;
          return; // pausa após output
        case 5:
          this.ip = getParam(1) !== 0 ? getParam(2) : this.ip + 3;
          break;
        case 6:
          this.ip = getParam(1) === 0 ? getParam(2) : this.ip + 3;
          break;
        case 7:
          this.set(getAddr(3), getParam(1) < getParam(2) ? 1 : 0);
          this.ip += 4;
          break;
        case 8:
          this.set(getAddr(3), getParam(1) === getParam(2) ? 1 : 0);
          this.ip += 4;
          break;
        case 9:
          this.relativeBase += getParam(1);
          this.ip += 2;
          break;
        case 99:
          this.halted = true;
          return;
        default:
          throw new Error(`unknown opcode: ${opcode}`);
      }
    }
  }
}
