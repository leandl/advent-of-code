import type { IntcodeComputer } from "..";
import { Addressing } from "../addressing";
import type { Instruction } from "./instruction";

export class AddInstruction implements Instruction {
  execute(cpu: IntcodeComputer): void {
    const addressValue1 = Addressing.immediate(cpu);
    const addressValue2 = Addressing.immediate(cpu);
    const addressOutput = Addressing.immediate(cpu);

    const result = cpu.read(addressValue1) + cpu.read(addressValue2);
    cpu.write(addressOutput, result);
  }
}
