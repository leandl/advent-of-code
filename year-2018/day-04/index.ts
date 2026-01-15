import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2018", "day-04");
// const lines = [
//   "[1518-11-01 00:00] Guard #10 begins shift",
//   "[1518-11-01 00:05] falls asleep",
//   "[1518-11-01 00:25] wakes up",
//   "[1518-11-01 00:30] falls asleep",
//   "[1518-11-01 00:55] wakes up",
//   "[1518-11-01 23:58] Guard #99 begins shift",
//   "[1518-11-02 00:40] falls asleep",
//   "[1518-11-02 00:50] wakes up",
//   "[1518-11-03 00:05] Guard #10 begins shift",
//   "[1518-11-03 00:24] falls asleep",
//   "[1518-11-03 00:29] wakes up",
//   "[1518-11-04 00:02] Guard #99 begins shift",
//   "[1518-11-04 00:36] falls asleep",
//   "[1518-11-04 00:46] wakes up",
//   "[1518-11-05 00:03] Guard #99 begins shift",
//   "[1518-11-05 00:45] falls asleep",
//   "[1518-11-05 00:55] wakes up",
// ];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
