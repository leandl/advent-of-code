import { IntcodeComputer } from "../../utils/intcode-computer";
import { BoostParams } from "./utils";

export function part2Run({ program }: BoostParams) {
  const computer = new IntcodeComputer(program);

  computer.provideInput(2);

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
