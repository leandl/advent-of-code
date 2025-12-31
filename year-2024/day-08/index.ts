import { parseGrid } from "../../utils/parsers";
import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2024", "day-08");
// const lines = [
//   "............",
//   "........0...",
//   ".....0......",
//   ".......0....",
//   "....0.......",
//   "......A.....",
//   "............",
//   "............",
//   "........A...",
//   ".........A..",
//   "............",
//   "............",
// ];

const grid = parseGrid(lines);

const resultPart1 = part1Run(grid);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(grid);
console.log("Result Part 2: ", resultPart2);
