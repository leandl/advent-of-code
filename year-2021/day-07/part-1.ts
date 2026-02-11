export function part1Run(positions: number[]) {
  const sorted = [...positions].sort((a, b) => a - b);

  const middle = Math.floor(sorted.length / 2);
  const median = sorted[middle];

  const totalFuel = sorted.reduce(
    (sum, pos) => sum + Math.abs(pos - median),
    0
  );

  return totalFuel;
}
