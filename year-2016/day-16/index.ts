import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const inputPuzzle = "01110110101001000";

const resultPart1 = part1Run(inputPuzzle, 272);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(inputPuzzle, 35651584);
console.log("Result Part 2: ", resultPart2);
