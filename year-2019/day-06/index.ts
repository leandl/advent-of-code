import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseOrbitMap } from "./utils";

const lines = await readInputLines("year-2019", "day-06");
// const lines = [
//   "COM)B",
//   "B)C",
//   "C)D",
//   "D)E",
//   "E)F",
//   "B)G",
//   "G)H",
//   "D)I",
//   "E)J",
//   "J)K",
//   "K)L",
// ];

const orbits = parseOrbitMap(lines);

const resultPart1 = part1Run(orbits);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(orbits);
console.log("Result Part 2: ", resultPart2);
