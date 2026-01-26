export function part1Run(jumps: number[]) {
  const instructions = [...jumps];

  let index = 0;
  let steps = 0;

  while (index >= 0 && index < instructions.length) {
    const jump = instructions[index];
    instructions[index] += 1;
    index += jump;
    steps++;
  }

  return steps;
}
