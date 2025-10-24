import { Boss, findMinMana, Player } from "./utils";

export function part2Run(player: Player, boss: Boss) {
  const result = findMinMana(player, boss, "HARD");
  return result?.mana;
}
