export function part2Run(n: number): number {
  let power = 1;
  while (power * 3 <= n) {
    power *= 3;
  }

  if (n === power) {
    return n;
  }

  if (n <= 2 * power) {
    return n - power;
  }

  return 2 * n - 3 * power;
}
