export function part1Run(digits: string) {
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    const current = digits[i];
    const next = digits[(i + 1) % digits.length]; // circular

    if (current === next) {
      sum += Number(current);
    }
  }

  return sum;
}
