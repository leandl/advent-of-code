import { IntcodeComputer } from "../../utils/m-intcode-computer";
import { NullIO } from "../../utils/m-intcode-computer/factories/io/null-io";
import { restoreGravityAssist } from "./utils";

export function part1Run(program: number[]) {
  const restoredProgram = restoreGravityAssist(program, 12, 2);
  const computer = new IntcodeComputer(restoredProgram, new NullIO());

  computer.run();

  return computer.read(0);
}
