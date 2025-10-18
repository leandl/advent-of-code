import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { readInputLines } from "../../utils/read-input";

const lines = await readInputLines("year-2015", "day-09");

// const lines = [
//   "London to Dublin = 464",
//   "London to Belfast = 518",
//   "Dublin to Belfast = 141",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
