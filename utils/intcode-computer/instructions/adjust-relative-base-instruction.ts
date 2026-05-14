import type { IntcodeComputer } from "..";
import { Addressing } from "../addressing";
import { CPURegister } from "../registers";
import type { Instruction } from "./instruction";

export class AdjustRelativeBaseInstruction implements Instruction {
  size = 2;

  execute(cpu: IntcodeComputer, modes: number[]) {
    const value = Addressing.read(cpu, 1, modes[0]);

    cpu.registers[CPURegister.RELATIVE_BASE] += value;
    cpu.registers[CPURegister.PROGRAM_COUNTER] += this.size;
  }
}
