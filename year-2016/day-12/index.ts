import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseInstructions } from "./utils";

const lines = await readInputLines("year-2016", "day-12", "data");
// const lines = await readInputLines("year-2016", "day-12", "example");

const resultPart1 = part1Run(parseInstructions(lines));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseInstructions(lines));
console.log("Result Part 2: ", resultPart2);
