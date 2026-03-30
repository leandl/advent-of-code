import { IntcodeComputer } from "../../utils/intcode-computer";

function isPulled(program: number[], x: number, y: number): number {
  const computer = new IntcodeComputer([...program]);

  const inputs = [x, y];
  let i = 0;
  let output = 0;

  computer.run({
    input: () => inputs[i++],
    output: (v) => (output = v),
  });

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
      // encontramos!
      return x * 10000 + checkY;
    }
  }
}
