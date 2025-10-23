import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { Boss } from "./utils";

// const inputPuzzle = 1330;
const inputPuzzle = 29_000_000;

const boss: Boss = {
  life: 109,
  damage: 8,
  armor: 2,
};

const resultPart1 = part1Run(boss);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(boss);
console.log("Result Part 2: ", resultPart2);
