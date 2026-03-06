import { memo } from "../../utils/function";

const factorial = memo(function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
});

export function part2Run(resultPart1: number): number {
  return factorial(12) + resultPart1 - factorial(7);
}
