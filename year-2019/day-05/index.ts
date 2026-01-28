import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseProgram } from "./utils";

const inputContent = await readInputContent("year-2019", "day-05");
const program = parseProgram(inputContent);

const resultPart1 = part1Run(program);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(program);
console.log("Result Part 2: ", resultPart2);
