import { IntcodeComputer } from "./utils";

export function part1Run(program: number[]) {
  const computer = new IntcodeComputer(program);
  const outputs: number[] = [];

  computer.run({
    input: () => 0, // nunca usado
    output: (v) => outputs.push(v),
  });

  let blocks = 0;

  for (let i = 0; i < outputs.length; i += 3) {
    const tileId = outputs[i + 2];
    if (tileId === 2) blocks++;
  }

  return blocks;
}
