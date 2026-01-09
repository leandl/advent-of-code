export function part2Run(numbers: number[]) {
  let increases = 0;

  // Calcula a soma da primeira janela
  let previousSum = numbers[0] + numbers[1] + numbers[2];

  // Percorre as janelas seguintes
  for (let i = 1; i <= numbers.length - 3; i++) {
    const currentSum = numbers[i] + numbers[i + 1] + numbers[i + 2];

    if (currentSum > previousSum) {
      increases++;
    }

    previousSum = currentSum;
  }

  return increases;
}
