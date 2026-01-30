import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseLineSegments } from "./utils";

const lines = await readInputLines("year-2021", "day-05");
// const lines = [
//   "0,9 -> 5,9",
//   "8,0 -> 0,8",
//   "9,4 -> 3,4",
//   "2,2 -> 2,1",
//   "7,0 -> 7,4",
//   "6,4 -> 2,0",
//   "0,9 -> 2,9",
//   "3,4 -> 1,4",
//   "0,0 -> 8,8",
//   "5,5 -> 8,2",
// ];

const lineSegments = parseLineSegments(lines);

const resultPart1 = part1Run(lineSegments);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lineSegments);
console.log("Result Part 2: ", resultPart2);
