function getDividers(n: number): number[] {
  const dividers = new Set<number>();
  const mid = Math.sqrt(n);

  for (let d = 1; d <= mid; d++) {
    if (n % d === 0) {
      const dividerA = d;
      const dividerB = Math.floor(n / d);

      if (dividerB <= 50) {
        dividers.add(dividerA);
      }

      if (dividerA <= 50) {
        dividers.add(dividerB);
      }
    }
  }

  return Array.from(dividers);
}

function getNumberPresentsByNumberHouse(n: number) {
  const dividers = getDividers(n);
  const sun = dividers.reduce((acc, c) => acc + c, 0);
  return sun * 11;
}

export function part2Run(inputPuzzle: number) {
  let n = 0;
  let result = 0;
  while (result <= inputPuzzle) {
    n += 1;
    result = getNumberPresentsByNumberHouse(n);
  }

  return n;
}
