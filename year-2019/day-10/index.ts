import { parseGrid } from "../../utils/parsers";
import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const inputContent = await readInputLines("year-2019", "day-10", "data");
// const inputContent = await readInputLines("year-2019", "day-10", "example");

const resultPart1 = part1Run(parseGrid(inputContent));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseGrid(inputContent));
console.log("Result Part 2: ", resultPart2);
