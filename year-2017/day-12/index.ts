import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseProgramGraph } from "./utils";

const inputContent = await readInputLines("year-2017", "day-12", "data");
// const inputContent = await readInputLines("year-2017", "day-12", "example");

const resultPart1 = part1Run(parseProgramGraph(inputContent));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseProgramGraph(inputContent));
console.log("Result Part 2: ", resultPart2);
