import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseSteps } from "./utlts";

const lines = await readInputLines("year-2021", "day-22", "data");
// const lines = await readInputLines("year-2021", "day-22", "example");

const resultPart1 = part1Run(parseSteps(lines));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseSteps(lines));
console.log("Result Part 2: ", resultPart2);
