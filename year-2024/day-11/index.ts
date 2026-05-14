import { parseList } from "../../utils/parsers";
import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const inputContent = await readInputContent("year-2024", "day-11", "data");

const resultPart1 = part1Run(parseList(inputContent, /\s+/));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseList(inputContent, /\s+/));
console.log("Result Part 2: ", resultPart2);
