import { IntcodeComputer } from "../../utils/intcode-computer";
import { buildPath, compress, getGrid } from "./utils";

export function part2Run(program: number[]): number {
  const grid = getGrid(program);
  const path = buildPath(grid);
  const { main, A, B, C } = compress(path);

  const memory = [...program];
  memory[0] = 2;

  const computer = new IntcodeComputer(memory);

  const inputString =
    `${main.join(",")}\n` +
    `${A.join(",")}\n` +
    `${B.join(",")}\n` +
    `${C.join(",")}\n` +
    `n\n`;

  const inputQueue = inputString.split("").map((c) => c.charCodeAt(0));

  let inputIndex = 0;
  let lastOutput = 0;

  while (true) {
    const res = computer.run();

    if (res.type === "output") {
      lastOutput = res.value;
    }

    if (res.type === "need_input") {
      const value = inputQueue[inputIndex++];
      if (value === undefined) {
        throw new Error("Input esgotado");
      }
      computer.io.provideInput(value);
    }

    if (res.type === "halt") {
      break;
    }
  }

  return lastOutput;
}
