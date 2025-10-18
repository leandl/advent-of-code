export function part1Run(dataText: string) {
  let starts = 0;
  let ends = 0;

  for (const char of dataText) {
    if (char === "(") {
      starts += 1;
    }

    if (char === ")") {
      ends += 1;
    }
  }

  return starts - ends;
}
