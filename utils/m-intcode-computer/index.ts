import { Addressing } from "./addressing";
import { instructions } from "./factories/all-instruction";
import { Memory } from "./memory";
import { Opcode } from "./opcode";
import { Registers } from "./registers";

export class IntcodeComputer {
  private instructions = instructions;
  private memory = new Memory();
  registers = new Registers();

  read(addr: number): number {
    return this.memory.read(addr);
  }

  write(addr: number, data: number): void {
    this.memory.write(addr, data);
  }

  loadProgram(program: number[], startAddress?: number) {
    this.memory.load(program, startAddress);
  }

  step() {
    const address = Addressing.immediate(this);
    const opcode = this.read(address) as Opcode;

    const instruction = this.instructions[opcode];
    if (!instruction) {
      throw new Error(`Unknown opcode: ${opcode}`);
    }
  }
}
