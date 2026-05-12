import type { IntcodeComputer } from "..";
import { ParameterModes } from "../addressing";

export interface Instruction {
  size: number;
  execute(cpu: IntcodeComputer, modes: ParameterModes): void;
}
