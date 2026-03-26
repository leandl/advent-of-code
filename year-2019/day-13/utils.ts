export type IntcodeIO = {
  input: () => number;
  output: (value: number) => void;
};

export class IntcodeComputer {
  private memory = new Map<number, number>();
  private ip = 0;
  private relativeBase = 0;
  private halted = false;

  constructor(program: number[]) {
    program.forEach((v, i) => this.memory.set(i, v));
  }

  private get(addr: number): number {
    return this.memory.get(addr) ?? 0;
  }

  private set(addr: number, value: number) {
    this.memory.set(addr, value);
  }

  private getParam(mode: number, offset: number): number {
    const val = this.get(this.ip + offset);
    if (mode === 0) return this.get(val);
    if (mode === 1) return val;
    if (mode === 2) return this.get(this.relativeBase + val);
    throw new Error("Invalid mode");
  }

  private getWriteAddr(mode: number, offset: number): number {
    const val = this.get(this.ip + offset);
    if (mode === 0) return val;
    if (mode === 2) return this.relativeBase + val;
    throw new Error("Invalid write mode");
  }

  run(io: IntcodeIO): void {
    while (!this.halted) {
      const instruction = this.get(this.ip);
      const opcode = instruction % 100;

      const modes = Math.floor(instruction / 100)
        .toString()
        .padStart(3, "0")
        .split("")
        .reverse()
        .map(Number);

      switch (opcode) {
        case 1: // add
          this.set(
            this.getWriteAddr(modes[2], 3),
            this.getParam(modes[0], 1) + this.getParam(modes[1], 2),
          );
          this.ip += 4;
          break;

        case 2: // multiply
          this.set(
            this.getWriteAddr(modes[2], 3),
            this.getParam(modes[0], 1) * this.getParam(modes[1], 2),
          );
          this.ip += 4;
          break;

        case 3: // input
          this.set(this.getWriteAddr(modes[0], 1), io.input());
          this.ip += 2;
          break;

        case 4: // output
          io.output(this.getParam(modes[0], 1));
          this.ip += 2;
          break;

        case 5: // jump-if-true
          if (this.getParam(modes[0], 1) !== 0) {
            this.ip = this.getParam(modes[1], 2);
          } else {
            this.ip += 3;
          }
          break;

        case 6: // jump-if-false
          if (this.getParam(modes[0], 1) === 0) {
            this.ip = this.getParam(modes[1], 2);
          } else {
            this.ip += 3;
          }
          break;

        case 7: // less than
          this.set(
            this.getWriteAddr(modes[2], 3),
            this.getParam(modes[0], 1) < this.getParam(modes[1], 2) ? 1 : 0,
          );
          this.ip += 4;
          break;

        case 8: // equals
          this.set(
            this.getWriteAddr(modes[2], 3),
            this.getParam(modes[0], 1) === this.getParam(modes[1], 2) ? 1 : 0,
          );
          this.ip += 4;
          break;

        case 9: // adjust relative base
          this.relativeBase += this.getParam(modes[0], 1);
          this.ip += 2;
          break;

        case 99:
          this.halted = true;
          break;

        default:
          throw new Error(`Unknown opcode ${opcode}`);
      }
    }
  }
}
