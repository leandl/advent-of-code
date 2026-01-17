function isValidPassword(password: number): boolean {
  const digits = password.toString();

  // Garante 6 dígitos
  if (digits.length !== 6) {
    return false;
  }

  let groups: number[] = [];
  let currentGroupSize = 1;

  for (let i = 0; i < digits.length - 1; i++) {
    const current = digits[i];
    const next = digits[i + 1];

    // Regra: nunca diminuir
    if (next < current) {
      return false;
    }

    if (current === next) {
      currentGroupSize++;
    } else {
      groups.push(currentGroupSize);
      currentGroupSize = 1;
    }
  }

  // Último grupo
  groups.push(currentGroupSize);

  // Regra: existe um grupo exatamente com 2 dígitos
  return groups.includes(2);
}

export function part2Run(input: string) {
  const [min, max] = input.split("-").map(Number);

  let count = 0;

  for (let i = min; i <= max; i++) {
    if (isValidPassword(i)) {
      count++;
    }
  }

  return count;
}
