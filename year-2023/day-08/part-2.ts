import { NavigationMap } from "./utils";

function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function lcmMultiple(numbers: number[]): number {
  return numbers.reduce((acc, n) => lcm(acc, n));
}

export function part2Run({ instructions, network }: NavigationMap) {
  const startNodes = Object.keys(network).filter((n) => n.endsWith("A"));

  const cycleLengths: number[] = [];

  for (const start of startNodes) {
    let current = start;
    let steps = 0;
    let instructionIndex = 0;

    while (!current.endsWith("Z")) {
      const direction = instructions[instructionIndex];
      current = network[current][direction];

      steps++;
      instructionIndex = (instructionIndex + 1) % instructions.length;
    }

    cycleLengths.push(steps);
  }

  return lcmMultiple(cycleLengths);
}
