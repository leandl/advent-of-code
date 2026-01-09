import { parseNumbers } from "../../utils/parsers";
import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2021", "day-01");
// const lines = [
//   "199",
//   "200",
//   "208",
//   "210",
//   "200",
//   "207",
//   "240",
//   "269",
//   "260",
//   "263",
// ];

const numbers = parseNumbers(lines);

const resultPart1 = part1Run(numbers);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(numbers);
console.log("Result Part 2: ", resultPart2);
