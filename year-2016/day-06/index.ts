import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2016", "day-06");
// const lines = [
//   "eedadn",
//   "drvtee",
//   "eandsr",
//   "raavrd",
//   "atevrs",
//   "tsrnev",
//   "sdttsa",
//   "rasrtv",
//   "nssdts",
//   "ntnada",
//   "svetve",
//   "tesnvt",
//   "vntsnd",
//   "vrdear",
//   "dvrsen",
//   "enarar",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
