import { decode } from "./addressing";
import { instructions } from "./factories/instructions/all-instruction";
import { DefaultIO } from "./factories/io/default-io";
import { IODevice } from "./io-device";
import { Memory } from "./memory";
import { Opcode } from "./opcode";
import { CPURegister, Registers } from "./registers";

type RunStatus =
  | { readonly type: "need_input" }
  | { readonly type: "output"; readonly value: number }
  | { readonly type: "halt" };

export class IntcodeComputer {
  private instructions = instructions;
  private memory = new Memory();

  io = new DefaultIO();
  registers = new Registers();

  constructor(program: number[]) {
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

  run(): RunStatus {
    this.io.lastOutput = null;

    while (true) {
      const pc = this.registers.PC;
      const raw = this.read(pc);

      const { opcode } = decode(raw);

      if (opcode === Opcode.INPUT && this.io.peekInput() === undefined) {
        return { type: "need_input" };
      }

      this.step();

      if (opcode === Opcode.OUTPUT) {
        const out = this.io.lastOutput;
        if (out !== null) {
          this.io.lastOutput = null;
          return { type: "output", value: out };
        }
      }

      if (this.registers.IS_HALT) {
        return { type: "halt" };
      }
    }
  }

  provideInput(value: number) {
    this.io.provideInput(value);
  }
}
