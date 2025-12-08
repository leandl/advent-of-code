import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2025", "day-08");
// const lines = [
//   "162,817,812",
//   "57,618,57",
//   "906,360,560",
//   "592,479,940",
//   "352,342,300",
//   "466,668,158",
//   "542,29,236",
//   "431,825,988",
//   "739,650,466",
//   "52,470,668",
//   "216,146,977",
//   "819,987,18",
//   "117,168,530",
//   "805,96,715",
//   "346,949,466",
//   "970,615,88",
//   "941,993,340",
//   "862,61,35",
//   "984,92,344",
//   "425,690,689",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
