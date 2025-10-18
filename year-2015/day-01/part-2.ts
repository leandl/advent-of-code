export function part2Run(dataText: string) {
  let min = 0;
  let cur = 0;
  let i: number | null = null;

  for (let index = 0; index < dataText.length; index++) {
    const char = dataText[index];
    if (char === "(") {
      cur += 1;
    }

    if (char === ")") {
      cur -= 1;
    }

    min = Math.min(min, cur);
    if (min === -1) {
      i = index + 1;
      break;
    }
  }

  return i;
}
