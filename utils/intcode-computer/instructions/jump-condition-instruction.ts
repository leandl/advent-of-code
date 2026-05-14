import { IntcodeComputer } from "..";
import { Addressing, ParameterModes } from "../addressing";
import { Instruction } from "./instruction";

type JumpCondition = (value: number) => boolean;

export class JumpConditionInstruction implements Instruction {
  size = 3;
  constructor(private condition: JumpCondition) {}

  execute(cpu: IntcodeComputer, modes: ParameterModes) {
    const test = Addressing.read(cpu, 1, modes[0]);
    const target = Addressing.read(cpu, 2, modes[1]);

    if (this.condition(test)) {
      cpu.registers.PC = target;
    } else {
      cpu.registers.PC += this.size;
    }
  }
}
