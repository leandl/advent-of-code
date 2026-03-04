export function part1Run(n: number): number {
  const highestPowerOfTwo = 1 << Math.floor(Math.log2(n));

  return 2 * (n - highestPowerOfTwo) + 1;
}
