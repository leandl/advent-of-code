import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { RunParams } from "./utils";

const data: RunParams = {
  favoriteNumber: 1358,
  target: { x: 31, y: 39 },
};

// const data: RunParams = {
//   favoriteNumber: 10,
//   target: { x: 7, y: 4 },
// };

const resultPart1 = part1Run(data);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(data);
console.log("Result Part 2: ", resultPart2);
