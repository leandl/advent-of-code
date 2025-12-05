import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2025", "day-05");
// const lines = [
//   "3-5",
//   "10-14",
//   "16-20",
//   "12-18",
//   "",
//   "1",
//   "5",
//   "8",
//   "11",
//   "17",
//   "32",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
