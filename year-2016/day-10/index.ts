import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseInstructions, RunParams } from "./utils";

const params = {
  compareValues: [61, 17],
  instructions: parseInstructions(
    await readInputLines("year-2016", "day-10", "data"),
  ),
} as RunParams;

// const params = {
//   compareValues: [5, 2],
//   instructions: parseInstructions(
//     await readInputLines("year-2016", "day-10", "example"),
//   ),
// } as RunParams;

const resultPart1 = part1Run(params);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(params);
console.log("Result Part 2: ", resultPart2);
