import { Opcode } from "../../opcode";
import type { Instruction } from "../../instructions/instruction";
import { AddInstruction } from "../../instructions/add-instruction";
import { MultiplyInstruction } from "../../instructions/multiply-instruction";
import { HaltInstruction } from "../../instructions/halt-instruction";
import { InputInstruction } from "../../instructions/input-instruction";
import { OutputInstruction } from "../../instructions/output-instruction";
import { JumpConditionInstruction } from "../../instructions/jump-condition-instruction";
import { CompareInstruction } from "../../instructions/compate-instruction";
import { AdjustRelativeBaseInstruction } from "../../instructions/adjust-relative-base-instruction";

export const instructions: Record<Opcode, Instruction> = {
  [Opcode.HALT]: new HaltInstruction(),

  [Opcode.ADD]: new AddInstruction(),
  [Opcode.MULTIPLY]: new MultiplyInstruction(),

  [Opcode.INPUT]: new InputInstruction(),
  [Opcode.OUTPUT]: new OutputInstruction(),

  [Opcode.JUMP_IF_TRUE]: new JumpConditionInstruction((v) => v !== 0),
  [Opcode.JUMP_IF_FALSE]: new JumpConditionInstruction((v) => v === 0),

  [Opcode.LESS_THAN]: new CompareInstruction((a, b) => a < b),
  [Opcode.EQUALS]: new CompareInstruction((a, b) => a === b),

  [Opcode.ADJUST_RELATIVE_BASE]: new AdjustRelativeBaseInstruction(),
};
