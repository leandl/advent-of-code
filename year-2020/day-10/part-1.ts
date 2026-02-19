export function part1Run(adapters: number[]) {
  const sorted = [...adapters].sort((a, b) => a - b);

  sorted.unshift(0);
  sorted.push(sorted[sorted.length - 1] + 3);

  let diff1 = 0;
  let diff3 = 0;

  for (let i = 1; i < sorted.length; i++) {
    const diff = sorted[i] - sorted[i - 1];

    if (diff === 1) diff1++;
    if (diff === 3) diff3++;
  }

  return diff1 * diff3;
}
