export function part1Run(numbers: number[]) {
  let sum = 0;
  for (let i = 1; i < numbers.length; i++) {
    const n1 = numbers[i - 1];
    const n2 = numbers[i];

    if (n1 < n2) {
      sum += 1;
    }
  }

  return sum;
}
