import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { readInputLines } from "../../utils/read-input";

const lines = await readInputLines("year-2015", "day-15");

// const lines = [
//   "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8",
//   "Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
