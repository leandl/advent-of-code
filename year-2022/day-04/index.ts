import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2022", "day-04");
// const lines = [
//   "2-4,6-8",
//   "2-3,4-5",
//   "5-7,7-9",
//   "2-8,3-7",
//   "6-6,4-6",
//   "2-6,4-8",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
