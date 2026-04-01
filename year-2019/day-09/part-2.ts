import { IntcodeComputer } from "../../utils/intcode-computer";
import { BoostParams } from "./utils";

export function part2Run({ program }: BoostParams) {
  const computer = new IntcodeComputer(program);

  const inputs = [2];
  let lastOutput: number | null = null;

  while (!computer.isHalted()) {
    const output = computer.runUntilOutput(() => {
      if (inputs.length === 0) {
        throw new Error("Input esperado");
      }
      return inputs.shift()!;
    });

    if (output !== null) {
      lastOutput = output;
    }
  }

  return lastOutput;
}
