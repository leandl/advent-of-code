import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2015", "day-23");
// const lines: string[] = ["inc a", "jio a, +2", "tpl a", "inc a"];

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
