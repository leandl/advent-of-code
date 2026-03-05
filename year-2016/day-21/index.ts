import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseInstructions, RunParams } from "./utils";

// INPUT REAL 1
const params1: RunParams = {
  password: "abcdefgh",
  instructions: parseInstructions(
    await readInputLines("year-2016", "day-21", "data"),
  ),
};

// EXEMPLO 1
// const params1: RunParams = {
//   password: "abcde",
//   instructions: parseInstructions(
//     await readInputLines("year-2016", "day-21", "example"),
//   ),
// };

const resultPart1 = part1Run(params1);
console.log("Result Part 1: ", resultPart1);

// INPUT REAL 2
const params2: RunParams = {
  password: "fbgdceah",
  instructions: parseInstructions(
    await readInputLines("year-2016", "day-21", "data"),
  ),
};

const resultPart2 = part2Run(params2);
console.log("Result Part 2: ", resultPart2);
