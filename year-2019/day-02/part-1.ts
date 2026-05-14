import { IntcodeComputer } from "../../utils/intcode-computer";

import { restoreGravityAssist } from "./utils";

export function part1Run(program: number[]) {
  const restoredProgram = restoreGravityAssist(program, 12, 2);
  const computer = new IntcodeComputer(restoredProgram);

  while (true) {
    const response = computer.run();
    if (response.type === "halt") break;
  }

  return computer.read(0);
}
