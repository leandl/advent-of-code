import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";

const lines = await readInputLines("year-2025", "day-12");
// const lines = [
//   "0:",
//   "###",
//   "##.",
//   "##.",
//   "",
//   "1:",
//   "###",
//   "##.",
//   ".##",
//   "",
//   "2:",
//   ".##",
//   "###",
//   "##.",
//   "",
//   "3:",
//   "##.",
//   "###",
//   "##.",
//   "",
//   "4:",
//   "###",
//   "#..",
//   "###",
//   "",
//   "5:",
//   "###",
//   ".#.",
//   "###",
//   "",
//   "4x4: 0 0 0 0 2 0",
//   "12x5: 1 0 1 0 2 2",
//   "12x5: 1 0 1 0 3 2",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);
