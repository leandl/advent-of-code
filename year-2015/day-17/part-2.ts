function* generateCompositions(
  containers: number[],
  liters: number
): Generator<number[]> {
  function* rec(
    currentIndex: number,
    itemRemaining: number,
    currentComposition: number[]
  ): Generator<number[]> {
    for (let i = currentIndex; i < containers.length; i++) {
      const item = containers[i];
      const newComposition = [...currentComposition, item];
      if (itemRemaining === 1) {
        yield newComposition;
        continue;
      }

      const newCurrentIndex = i + 1;
      const newItemRemaining = itemRemaining - 1;

      for (const composition of rec(
        newCurrentIndex,
        newItemRemaining,
        newComposition
      )) {
        yield composition;
      }
    }
  }

  for (let itens = 1; itens <= containers.length; itens++) {
    let findCompositions = false;
    for (const composition of rec(0, itens, [])) {
      const sum = composition.reduce((acc, v) => acc + v, 0);
      if (sum === liters) {
        findCompositions = true;
        yield composition;
      }
    }

    if (findCompositions) {
      return;
    }
  }
}

export function part2Run(lines: string[]) {
  const l = lines.map(Number);

  let count = 0;
  for (const _composition of generateCompositions(l, 150)) {
    count += 1;
  }

  return count;
}
