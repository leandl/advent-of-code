import type { IntcodeComputer } from "..";

export interface Instruction {
  execute(cpu: IntcodeComputer): void;
}
