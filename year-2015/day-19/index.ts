import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { readInputLines } from "../../utils/read-input";

const lines = await readInputLines("year-2015", "day-19");
// const lines = ["e => H", "e => O", "H => HO", "H => OH", "O => HH", "", "HOH"];
// const lines = [
//   "e => H",
//   "e => O",
//   "H => HO",
//   "H => OH",
//   "O => HH",
//   "",
//   "HOHOHO",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
