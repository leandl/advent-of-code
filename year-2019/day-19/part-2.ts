import { IntcodeComputer } from "../../utils/intcode-computer";

function isPulled(program: number[], x: number, y: number): number {
  const computer = new IntcodeComputer([...program]);

  const inputQueue = [x, y];
  let inputIndex = 0;
  let output = 0;

  while (true) {
    const res = computer.run();

    if (res.type === "output") {
      output = res.value;
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

  return output;
}

export function part2Run(program: number[]) {
  let x = 0;

  for (let y = 100; ; y++) {
    while (isPulled(program, x, y) === 0) {
      x++;
    }

    const checkX = x + 99;
    const checkY = y - 99;

    if (isPulled(program, checkX, checkY) === 1) {
      return x * 10000 + checkY;
    }
  }
}
