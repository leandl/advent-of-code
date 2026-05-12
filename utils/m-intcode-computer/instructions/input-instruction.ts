import { Instruction } from "./instruction";
import { IntcodeComputer } from "..";
import { Addressing, ParameterModes } from "../addressing";

export class InputInstruction implements Instruction {
  size = 2;

  execute(cpu: IntcodeComputer, modes: ParameterModes) {
    const addr = Addressing.write(cpu, 1, modes[0]);

    const value = cpu.io.input();

    cpu.write(addr, value);

    cpu.registers.PC += this.size;
  }
}
