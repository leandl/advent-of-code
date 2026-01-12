import { parseElveCalories } from "./utils";

export function part2Run(lines: string[]) {
  const elves = parseElveCalories(lines);

  // Calcula o total de calorias de cada elfo
  const totals = elves.map((elf) => elf.reduce((sum, value) => sum + value, 0));

  // Ordena em ordem decrescente
  totals.sort((a, b) => b - a);

  // Soma os três maiores valores
  return totals.slice(0, 3).reduce((sum, value) => sum + value, 0);
}
