import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { readInputLines } from "../../utils/read-input";

const raceTime = 2503;
const lines = await readInputLines("year-2015", "day-14");

// const raceTime = 1000;
// const lines = [
//   "Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.",
//   "Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.",
// ];

const resultPart1 = part1Run(lines, raceTime);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines, raceTime);
console.log("Result Part 2: ", resultPart2);
