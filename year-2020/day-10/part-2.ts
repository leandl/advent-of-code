export function part2Run(adapters: number[]) {
  const sorted = [...adapters].sort((a, b) => a - b);

  sorted.unshift(0);
  sorted.push(sorted[sorted.length - 1] + 3);

  const ways = new Map<number, bigint>();
  ways.set(0, 1n);

  for (let i = 1; i < sorted.length; i++) {
    const joltage = sorted[i];

    const totalWays =
      (ways.get(joltage - 1) ?? 0n) +
      (ways.get(joltage - 2) ?? 0n) +
      (ways.get(joltage - 3) ?? 0n);

    ways.set(joltage, totalWays);
  }

  return ways.get(sorted[sorted.length - 1])!;
}
