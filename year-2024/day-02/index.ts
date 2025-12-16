import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2024", "day-02");
// const lines = [
//   "7 6 4 2 1",
//   "1 2 7 8 9",
//   "9 7 6 2 1",
//   "1 3 2 4 5",
//   "8 6 4 4 1",
//   "1 3 6 7 9",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
