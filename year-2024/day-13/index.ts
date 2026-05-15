import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseMachines } from "./utils";

const OFFSET = 10_000_000_000_000n;
const inputContent = await readInputContent("year-2024", "day-13", "data");

const resultPart1 = part1Run(parseMachines(inputContent));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseMachines(inputContent, OFFSET));
console.log("Result Part 2: ", resultPart2);
