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

  computer.run({
    input: () => inputQueue[inputIndex++],
    output: (value) => {
      lastOutput = value;
    },
  });

  return lastOutput;
}
