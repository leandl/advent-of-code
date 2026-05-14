import { IntcodeComputer } from "..";
import { Addressing, ParameterModes } from "../addressing";
import { Instruction } from "./instruction";

type CompareFn = (a: number, b: number) => boolean;

export class CompareInstruction implements Instruction {
  size = 4;

  constructor(private compare: CompareFn) {}

  execute(cpu: IntcodeComputer, modes: ParameterModes) {
    const a = Addressing.read(cpu, 1, modes[0]);
    const b = Addressing.read(cpu, 2, modes[1]);
    const addr = Addressing.write(cpu, 3, modes[2]);

    const result = this.compare(a, b) ? 1 : 0;

    cpu.write(addr, result);

    cpu.registers.PC += this.size;
  }
}
