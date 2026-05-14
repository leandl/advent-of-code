import { IntcodeComputer } from "../../utils/intcode-computer";
import { BoostParams } from "./utils";

export function part1Run({ program, input }: BoostParams) {
  const computer = new IntcodeComputer(program);

  computer.provideInput(input);

  let lastOutput: number | null = null;

  while (true) {
    const res = computer.run();

    if (res.type === "output") {
      lastOutput = res.value;
    }

    if (res.type === "halt") {
      break;
    }
  }

  return lastOutput;
}
