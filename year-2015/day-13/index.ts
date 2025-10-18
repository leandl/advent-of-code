import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { readInputLines } from "../../utils/read-input";

const lines = await readInputLines("year-2015", "day-13");

// const lines = [
//   "Alice would gain 54 happiness units by sitting next to Bob.",
//   "Alice would lose 79 happiness units by sitting next to Carol.",
//   "Alice would lose 2 happiness units by sitting next to David.",
//   "Bob would gain 83 happiness units by sitting next to Alice.",
//   "Bob would lose 7 happiness units by sitting next to Carol.",
//   "Bob would lose 63 happiness units by sitting next to David.",
//   "Carol would lose 62 happiness units by sitting next to Alice.",
//   "Carol would gain 60 happiness units by sitting next to Bob.",
//   "Carol would gain 55 happiness units by sitting next to David.",
//   "David would gain 46 happiness units by sitting next to Alice.",
//   "David would lose 7 happiness units by sitting next to Bob.",
//   "David would gain 41 happiness units by sitting next to Carol.",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
