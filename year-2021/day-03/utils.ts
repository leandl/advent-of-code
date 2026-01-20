export function convertBinaryStringToNumber(line: string): number {
  let n = 0;

  for (let index = line.length - 1; index >= 0; index--) {
    const binaryNumber = Number(line[index]);
    const pow = line.length - 1 - index;

    n += binaryNumber * Math.pow(2, pow);
  }

  return n;
}
