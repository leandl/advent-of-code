export function part2Run(targetCount: number) {
  const sequenceStr = targetCount.toString();
  const target = sequenceStr.split("").map(Number);
  const scoreboard: number[] = [3, 7];

  let elf1Index = 0;
  let elf2Index = 1;

  function matchesAtEnd(offset = 0): boolean {
    if (scoreboard.length < target.length + offset) return false;

    for (let i = 0; i < target.length; i++) {
      if (
        scoreboard[scoreboard.length - target.length - offset + i] !== target[i]
      ) {
        return false;
      }
    }
    return true;
  }

  while (true) {
    const sum = scoreboard[elf1Index] + scoreboard[elf2Index];

    // adiciona primeiro dígito (se tiver)
    if (sum >= 10) {
      scoreboard.push(1);

      if (matchesAtEnd()) {
        return scoreboard.length - target.length;
      }
    }

    // adiciona segundo dígito
    scoreboard.push(sum % 10);

    if (matchesAtEnd()) {
      return scoreboard.length - target.length;
    }

    // mover elfos
    elf1Index = (elf1Index + 1 + scoreboard[elf1Index]) % scoreboard.length;

    elf2Index = (elf2Index + 1 + scoreboard[elf2Index]) % scoreboard.length;
  }
}
