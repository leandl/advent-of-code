import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2024", "day-05");
// const lines = [
//   "47|53",
//   "97|13",
//   "97|61",
//   "97|47",
//   "75|29",
//   "61|13",
//   "75|53",
//   "29|13",
//   "97|29",
//   "53|29",
//   "61|53",
//   "97|53",
//   "61|29",
//   "47|13",
//   "75|47",
//   "97|75",
//   "47|61",
//   "75|61",
//   "47|29",
//   "75|13",
//   "53|13",
//   "",
//   "75,47,61,53,29",
//   "97,61,53,29,13",
//   "75,29,13",
//   "75,97,47,61,53",
//   "61,13,29",
//   "97,13,75,29,47",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
