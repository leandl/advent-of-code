export function part2Run(input: string) {
  const initial = input.split("").map(Number);
  const max = 1_000_000;
  const moves = 10_000_000;

  const next = new Array<number>(max + 1);

  // montar lista inicial
  for (let i = 0; i < initial.length - 1; i++) {
    next[initial[i]] = initial[i + 1];
  }

  // ligar último do input ao resto
  next[initial[initial.length - 1]] = Math.max(...initial) + 1;

  // completar até 1 milhão
  for (let i = Math.max(...initial) + 1; i < max; i++) {
    next[i] = i + 1;
  }

  // fechar ciclo
  next[max] = initial[0];

  let current = initial[0];

  for (let move = 0; move < moves; move++) {
    const pick1 = next[current];
    const pick2 = next[pick1];
    const pick3 = next[pick2];

    // remove
    next[current] = next[pick3];

    // destino
    let destination = current - 1 || max;

    while (
      destination === pick1 ||
      destination === pick2 ||
      destination === pick3
    ) {
      destination--;
      if (destination === 0) destination = max;
    }

    // insere
    next[pick3] = next[destination];
    next[destination] = pick1;

    current = next[current];
  }

  const a = next[1];
  const b = next[a];

  return a * b;
}
