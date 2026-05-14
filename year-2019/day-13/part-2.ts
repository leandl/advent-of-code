import { IntcodeComputer } from "../../utils/intcode-computer";

export function part2Run(program: number[]) {
  const memory = [...program];
  memory[0] = 2;

  const computer = new IntcodeComputer(memory);

  let ballX = 0;
  let paddleX = 0;
  let score = 0;

  let buffer: number[] = [];

  while (true) {
    const res = computer.run();

    if (res.type === "output") {
      buffer.push(res.value);

      if (buffer.length === 3) {
        const [x, y, tile] = buffer;
        buffer = [];

        // score update
        if (x === -1 && y === 0) {
          score = tile;
          continue;
        }

        // paddle
        if (tile === 3) paddleX = x;

        // ball
        if (tile === 4) ballX = x;
      }
    }

    if (res.type === "need_input") {
      // joystick auto-play
      if (ballX < paddleX) computer.provideInput(-1);
      else if (ballX > paddleX) computer.provideInput(1);
      else computer.provideInput(0);
    }

    if (res.type === "halt") {
      break;
    }
  }

  return score;
}
