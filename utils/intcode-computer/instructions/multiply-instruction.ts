import type { IntcodeComputer } from "..";
import { Addressing } from "../addressing";
import { CPURegister } from "../registers";
import type { Instruction } from "./instruction";

export class MultiplyInstruction implements Instruction {
  size = 4;

  execute(cpu: IntcodeComputer, modes: number[]) {
    const a = Addressing.read(cpu, 1, modes[0]);
    const b = Addressing.read(cpu, 2, modes[1]);
    const addr = Addressing.write(cpu, 3, modes[2]);

    cpu.write(addr, a * b);

    cpu.registers[CPURegister.PROGRAM_COUNTER] += this.size;
  }
}
