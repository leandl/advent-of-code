import { parseNumbers } from "../../utils/parsers";
import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const xmasEncodingParams = {
  numbers: parseNumbers(await readInputLines("year-2020", "day-09", "data")),
  preambleLength: 25,
};

// const xmasEncodingParams = {
//   numbers: parseNumbers(await readInputLines("year-2020", "day-09", "example")),
//   preambleLength: 5,
// };

const resultPart1 = part1Run(xmasEncodingParams);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(xmasEncodingParams);
console.log("Result Part 2: ", resultPart2);
