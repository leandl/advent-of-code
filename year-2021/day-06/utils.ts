export function parseLanternfish(input: string): number[] {
  return input.trim().split(",").map(Number);
}

export function simulateLanternfish(
  initialTimers: readonly number[],
  days: number
): number {
  const counts = Array(9).fill(0) as number[];

  for (const timer of initialTimers) {
    counts[timer]++;
  }

  for (let day = 0; day < days; day++) {
    const spawning = counts[0];

    for (let t = 0; t < 8; t++) {
      counts[t] = counts[t + 1];
    }

    counts[6] += spawning;
    counts[8] = spawning;
  }

  return counts.reduce((sum, n) => sum + n, 0);
}
