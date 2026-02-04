import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseInputPuzzle } from "./utils";

const inputContent = await readInputContent("year-2023", "day-05", "data");
// const inputContent = await readInputContent("year-2023", "day-05", "example");

const resultPart1 = part1Run(parseInputPuzzle(inputContent));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseInputPuzzle(inputContent));
console.log("Result Part 2: ", resultPart2);
