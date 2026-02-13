import { NavigationMap } from "./utils";

export function part1Run({ instructions, network }: NavigationMap) {
  let current = "AAA";
  let steps = 0;
  let instructionIndex = 0;

  while (current !== "ZZZ") {
    const direction = instructions[instructionIndex];
    current = network[current][direction];

    steps++;
    instructionIndex = (instructionIndex + 1) % instructions.length;
  }

  return steps;
}
