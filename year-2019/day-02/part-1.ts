import { IntcodeComputer } from "../../utils/new-intcode-computer";
import { restoreGravityAssist } from "./utils";

export function part1Run(program: number[]) {
  const restoredProgram = restoreGravityAssist(program, 12, 2);
  const computer = new IntcodeComputer(restoredProgram);

  const result = computer.run();
  return result;
}
