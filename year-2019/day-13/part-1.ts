import { IntcodeComputer } from "../../utils/intcode-computer";

export function part1Run(program: number[]) {
  const computer = new IntcodeComputer(program);

  const outputs: number[] = [];

  while (true) {
    const res = computer.run();

    if (res.type === "output") {
      outputs.push(res.value);
    }

    if (res.type === "halt") {
      break;
    }

    // Day 13 não precisa de input manual
    if (res.type === "need_input") {
      computer.provideInput(0);
    }
  }

  let blocks = 0;

  for (let i = 0; i < outputs.length; i += 3) {
    const tileId = outputs[i + 2];
    if (tileId === 2) blocks++;
  }

  return blocks;
}
