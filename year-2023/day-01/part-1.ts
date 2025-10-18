function getID1(data: string): number {
  let firstTime = true;
  let firstNumber = 0;
  let lastNumber = 0;

  for (const char of data) {
    const n = parseInt(char);

    if (!isNaN(n)) {
      if (firstTime) {
        firstNumber = n;
        firstTime = false;
      }
      lastNumber = n;
    }
  }

  return firstNumber * 10 + lastNumber;
}

export function part1Run(lines: string[]) {
  let sum = 0;

  for (const line of lines) {
    sum += getID1(line);
  }

  return sum;
}
