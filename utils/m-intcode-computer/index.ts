import { decode } from "./addressing";
import { instructions } from "./factories/instructions/all-instruction";
import { IODevice } from "./io-device";
import { Memory } from "./memory";
import { CPURegister, Registers } from "./registers";

export class IntcodeComputer {
  private instructions = instructions;
  private memory = new Memory();
  registers = new Registers();

  constructor(
    program: number[],
    public io: IODevice,
  ) {
    this.memory.load(program);
  }

  read(addr: number): number {
    return this.memory.read(addr);
  }

  write(addr: number, data: number): void {
    this.memory.write(addr, data);
  }

  step() {
    if (this.registers[CPURegister.IS_HALT]) return;

    const pc = this.registers.PC;
    const raw = this.read(pc);

    const { opcode, modes } = decode(raw);

    const instruction = this.instructions[opcode];
    if (!instruction) {
      throw new Error(`Unknown opcode: ${opcode}`);
    }

    instruction.execute(this, modes);
  }

  run() {
    while (!this.registers[CPURegister.IS_HALT]) {
      this.step();
    }
  }
}
