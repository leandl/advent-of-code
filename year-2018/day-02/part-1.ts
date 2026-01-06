export function part1Run(lines: string[]) {
  let countTwo = 0;
  let countThree = 0;

  for (const id of lines) {
    const letterCount = new Map<string, number>();

    // Conta as letras
    for (const char of id) {
      letterCount.set(char, (letterCount.get(char) ?? 0) + 1);
    }

    let hasTwo = false;
    let hasThree = false;

    // Verifica frequências
    for (const count of letterCount.values()) {
      if (count === 2) hasTwo = true;
      if (count === 3) hasThree = true;
    }

    if (hasTwo) countTwo++;
    if (hasThree) countThree++;
  }

  return countTwo * countThree;
}
