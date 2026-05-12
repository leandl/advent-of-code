import { IntcodeComputer } from "..";
import { Addressing, ParameterModes } from "../addressing";
import { Instruction } from "./instruction";

export class OutputInstruction implements Instruction {
  opcode = 4;
  size = 2;

  execute(cpu: IntcodeComputer, modes: ParameterModes) {
    const value = Addressing.read(cpu, 1, modes[0]);

    cpu.io.output(value);

    cpu.registers.PC += this.size;
  }
}
