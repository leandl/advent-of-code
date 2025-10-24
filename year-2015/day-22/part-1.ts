import { Boss, findMinMana, Player } from "./utils";

export function part1Run(player: Player, boss: Boss) {
  const result = findMinMana(player, boss, "MEDIUM");
  return result?.mana;
}
