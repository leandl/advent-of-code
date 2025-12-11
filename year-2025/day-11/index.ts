import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2025", "day-11");
// const lines = [
//   "aaa: you hhh",
//   "you: bbb ccc",
//   "bbb: ddd eee",
//   "ccc: ddd eee fff",
//   "ddd: ggg",
//   "eee: out",
//   "fff: out",
//   "ggg: out",
//   "hhh: ccc fff iii",
//   "iii: out",
// ];
// const lines = [
//   "svr: aaa bbb",
//   "aaa: fft",
//   "fft: ccc",
//   "bbb: tty",
//   "tty: ccc",
//   "ccc: ddd eee",
//   "ddd: hub",
//   "hub: fff",
//   "eee: dac",
//   "dac: fff",
//   "fff: ggg hhh",
//   "ggg: out",
//   "hhh: out",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
