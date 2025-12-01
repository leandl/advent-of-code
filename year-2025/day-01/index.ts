import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2025", "day-01");
// const lines = [
//   "L68",
//   "L30",
//   "R48",
//   "L5",
//   "R60",
//   "L55",
//   "L1",
//   "L99",
//   "R14",
//   "L82",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
