import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parsePoints } from "./utils";

const lines = await readInputLines("year-2018", "day-06");
// const lines = ["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"];

const points = parsePoints(lines);

const resultPart1 = part1Run(points);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(points);
console.log("Result Part 2: ", resultPart2);
