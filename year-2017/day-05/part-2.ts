export function part2Run(jumps: number[]) {
  const instructions = [...jumps];

  let index = 0;
  let steps = 0;

  while (index >= 0 && index < instructions.length) {
    const jump = instructions[index];

    if (jump >= 3) {
      instructions[index] -= 1;
    } else {
      instructions[index] += 1;
    }

    index += jump;
    steps++;
  }

  return steps;
}
