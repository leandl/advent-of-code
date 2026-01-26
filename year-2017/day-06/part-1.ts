export function part1Run(banks: number[]) {
  const memory = [...banks]; // não mutar o input
  const seen = new Set<string>();

  let cycles = 0;

  while (true) {
    const state = memory.join(",");

    if (seen.has(state)) {
      return cycles;
    }

    seen.add(state);

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
