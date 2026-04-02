import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseConstraints, parseSchedule } from "./utils";

const lines = await readInputLines("year-2020", "day-13", "data");
// const lines = await readInputLines("year-2020", "day-13", "example");

const resultPart1 = part1Run(parseSchedule(lines));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseConstraints(lines));
console.log("Result Part 2: ", resultPart2);
