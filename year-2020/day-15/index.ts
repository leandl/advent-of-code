import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

// const inputPuzzle = [1, 3, 2];
// const inputPuzzle = [2, 1, 3];
// const inputPuzzle = [1, 2, 3];
// const inputPuzzle = [2, 3, 1];
// const inputPuzzle = [3, 2, 1];
// const inputPuzzle = [3, 1, 2];

const inputPuzzle = [14, 8, 16, 0, 1, 17];

const resultPart1 = part1Run(inputPuzzle);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(inputPuzzle);
console.log("Result Part 2: ", resultPart2);
