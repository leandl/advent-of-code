export function part1Run(targetCount: number) {
  const scoreboard: number[] = [3, 7];

  let elf1Index = 0;
  let elf2Index = 1;

  while (scoreboard.length < targetCount + 10) {
    const sum = scoreboard[elf1Index] + scoreboard[elf2Index];

    // adiciona dígitos
    if (sum >= 10) {
      scoreboard.push(1);
      scoreboard.push(sum % 10);
    } else {
      scoreboard.push(sum);
    }

    // move elfos
    elf1Index = (elf1Index + 1 + scoreboard[elf1Index]) % scoreboard.length;

    elf2Index = (elf2Index + 1 + scoreboard[elf2Index]) % scoreboard.length;
  }

  return scoreboard.slice(targetCount, targetCount + 10).join("");
}
