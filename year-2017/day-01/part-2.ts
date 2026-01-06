export function part2Run(digits: string) {
  let sum = 0;
  const mid = Math.floor(digits.length / 2);
  for (let i = 0; i < digits.length; i++) {
    const current = digits[i];
    const next = digits[(i + mid) % digits.length]; // circular

    if (current === next) {
      sum += Number(current);
    }
  }

  return sum;
}
