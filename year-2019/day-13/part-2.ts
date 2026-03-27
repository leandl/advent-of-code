import { IntcodeComputer } from "../../utils/intcode-computer";

export function part2Run(program: number[]) {
  const memory = [...program];
  memory[0] = 2;

  const computer = new IntcodeComputer(memory);

  let ballX = 0;
  let paddleX = 0;
  let score = 0;

  let buffer: number[] = [];

  computer.run({
    input: () => {
      if (ballX < paddleX) return -1;
      if (ballX > paddleX) return 1;
      return 0;
    },

    output: (value) => {
      buffer.push(value);

      if (buffer.length === 3) {
        const [x, y, tile] = buffer;
        buffer = [];

        if (x === -1 && y === 0) {
          score = tile;
        } else {
          if (tile === 3) paddleX = x;
          if (tile === 4) ballX = x;
        }
      }
    },
  });

  return score;
}
