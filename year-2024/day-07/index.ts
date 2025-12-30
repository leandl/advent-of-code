import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2024", "day-07");
// const lines = [
//   "190: 10 19",
//   "3267: 81 40 27",
//   "83: 17 5",
//   "156: 15 6",
//   "7290: 6 8 6 15",
//   "161011: 16 10 13",
//   "192: 17 8 14",
//   "21037: 9 7 18 13",
//   "292: 11 6 16 20",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
