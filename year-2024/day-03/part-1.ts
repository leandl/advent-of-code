import { parseMul } from "./utils";

export function part1Run(content: string): number {
  const muls = parseMul(content);
  let sum = 0;

  for (const [n1, n2] of muls) {
    sum += n1 * n2;
  }

  return sum;
}
