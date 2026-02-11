export function part2Run(positions: number[]) {
  const min = Math.min(...positions);
  const max = Math.max(...positions);

  let bestFuel = Infinity;
  let bestPosition = -1;

  for (let target = min; target <= max; target++) {
    let totalFuel = 0;

    for (const pos of positions) {
      const distance = Math.abs(pos - target);
      // Número triangular: n * (n + 1) / 2
      totalFuel += (distance * (distance + 1)) / 2;
    }

    if (totalFuel < bestFuel) {
      bestFuel = totalFuel;
      bestPosition = target;
    }
  }

  return bestFuel;
}
