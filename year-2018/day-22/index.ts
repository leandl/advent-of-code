import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { CaveInput } from "./utils";

const caveInput: CaveInput = {
  depth: 10647,
  target: { x: 7, y: 770 },
};

const resultPart1 = part1Run(caveInput);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(caveInput);
console.log("Result Part 2: ", resultPart2);
