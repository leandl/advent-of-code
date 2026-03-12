export function part2Run(steps: number) {
  let pos = 0;
  let size = 1;
  let valueAfterZero = 0;

  for (let i = 1; i <= 50_000_000; i++) {
    pos = (pos + steps) % size;

    if (pos + 1 === 1) {
      valueAfterZero = i;
    }

    pos++;
    size++;
  }

  return valueAfterZero;
}
