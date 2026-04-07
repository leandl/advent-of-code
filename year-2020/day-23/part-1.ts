function crabCups(input: string, moves: number): string {
  const cups = input.split("").map(Number);
  const max = Math.max(...cups);

  // "lista ligada": next[x] = próximo copo depois de x
  const next: number[] = new Array(max + 1);

  // montar ligação inicial
  for (let i = 0; i < cups.length - 1; i++) {
    next[cups[i]] = cups[i + 1];
  }
  next[cups[cups.length - 1]] = cups[0]; // fecha o ciclo

  let current = cups[0];

  for (let move = 0; move < moves; move++) {
    // pega os 3 próximos
    const pick1 = next[current];
    const pick2 = next[pick1];
    const pick3 = next[pick2];

    const picked = new Set([pick1, pick2, pick3]);

    // remove do ciclo
    next[current] = next[pick3];

    // escolhe destino
    let destination = current - 1;
    if (destination < 1) destination = max;

    while (picked.has(destination)) {
      destination--;
      if (destination < 1) destination = max;
    }

    // insere após destino
    next[pick3] = next[destination];
    next[destination] = pick1;

    // próximo atual
    current = next[current];
  }

  // construir resultado a partir do 1
  let result = "";
  let cur = next[1];

  while (cur !== 1) {
    result += cur;
    cur = next[cur];
  }

  return result;
}

export function part1Run(input: string) {
  return crabCups(input, 100);
}
