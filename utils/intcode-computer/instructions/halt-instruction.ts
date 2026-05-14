import type { IntcodeComputer } from "..";
import type { Instruction } from "./instruction";

export class HaltInstruction implements Instruction {
  size = 1;
  execute(cpu: IntcodeComputer): void {
    cpu.registers.halt();
  }
}
