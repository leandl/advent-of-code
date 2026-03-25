import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseMoons } from "./utils";

const inputContent = await readInputLines("year-2019", "day-12", "data");

const resultPart1 = part1Run(parseMoons(inputContent));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseMoons(inputContent));
console.log("Result Part 2: ", resultPart2);
