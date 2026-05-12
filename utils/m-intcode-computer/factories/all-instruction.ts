import { Opcode } from "../opcode";
import type { Instruction } from "../instructions/instruction";
import { AddInstruction } from "../instructions/add-instruction";
import { MultiplyInstruction } from "../instructions/multiply-instruction";
import { HaltInstruction } from "../instructions/halt-instruction";

export const instructions: Record<Opcode, Instruction> = {
  [Opcode.ADD]: new AddInstruction(),
  [Opcode.MULTIPLY]: new MultiplyInstruction(),
  [Opcode.HALT]: new HaltInstruction(),
};
