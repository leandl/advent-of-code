import { parseMulWithEnable } from "./utils";

export function part2Run(content: string): number {
  const muls = parseMulWithEnable(content);
  let sum = 0;

  for (const [n1, n2] of muls) {
    sum += n1 * n2;
  }

  return sum;
}
