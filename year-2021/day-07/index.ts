import { parseNumbers } from "../../utils/parsers";
import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const inputContent = await readInputContent("year-2021", "day-07", "data");
// const inputContent = await readInputContent("year-2021", "day-07", "example");

const resultPart1 = part1Run(parseNumbers(inputContent));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseNumbers(inputContent));
console.log("Result Part 2: ", resultPart2);
