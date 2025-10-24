import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { Boss, Player } from "./utils";

const player: Player = {
  hp: 50,
  mana: 500,
  armor: 0,
};

const boss: Boss = {
  hp: 51,
  damage: 9,
};

const resultPart1 = part1Run(player, boss);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(player, boss);
console.log("Result Part 2: ", resultPart2);
