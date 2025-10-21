function getDividers(n: number): number[] {
  const dividers = new Set<number>();
  const mid = Math.sqrt(n);

  for (let d = 1; d <= mid; d++) {
    if (n % d === 0) {
      dividers.add(d);
      dividers.add(Math.floor(n / d));
    }
  }

  return Array.from(dividers);
}

function getNumberPresentsByNumberHouse(n: number) {
  const dividers = getDividers(n);
  const sun = dividers.reduce((acc, c) => acc + c, 0);
  return sun * 10;
}

export function part1Run(inputPuzzle: number) {
  let n = 0;
  let result = 0;
  while (result <= inputPuzzle) {
    n += 1;
    result = getNumberPresentsByNumberHouse(n);
  }

  return n;
}
