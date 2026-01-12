import { parseNumbers } from "../../utils/parsers";
import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2022", "day-01");
// const lines = [
//   "1000",
//   "2000",
//   "3000",
//   "",
//   "4000",
//   "",
//   "5000",
//   "6000",
//   "",
//   "7000",
//   "8000",
//   "9000",
//   "",
//   "10000",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
