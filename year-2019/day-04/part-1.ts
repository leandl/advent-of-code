function isValidPassword(password: number): boolean {
  const digits = password.toString();

  let hasDouble = false;

  for (let i = 0; i < digits.length - 1; i++) {
    const current = digits[i];
    const next = digits[i + 1];

    // Regra: nunca diminuir
    if (next < current) {
      return false;
    }

    // Regra: dois adjacentes iguais
    if (current === next) {
      hasDouble = true;
    }
  }

  return hasDouble;
}

export function part1Run(input: string) {
  const [min, max] = input.split("-").map(Number);

  let count = 0;

  for (let i = min; i <= max; i++) {
    if (isValidPassword(i)) {
      count++;
    }
  }

  return count;
}
