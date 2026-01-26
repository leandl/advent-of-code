export function part2Run(banks: number[]) {
  const memory = [...banks];
  const seen = new Map<string, number>();

  let cycles = 0;

  while (true) {
    const state = memory.join(",");

    if (seen.has(state)) {
      // tamanho do loop
      return cycles - seen.get(state)!;
    }

    seen.set(state, cycles);

    // encontra o banco com mais blocos (empate → menor índice)
    let maxBlocks = Math.max(...memory);
    let index = memory.indexOf(maxBlocks);

    // redistribuição
    memory[index] = 0;
    let i = index + 1;

    while (maxBlocks > 0) {
      memory[i % memory.length]++;
      maxBlocks--;
      i++;
    }

    cycles++;
  }
}
