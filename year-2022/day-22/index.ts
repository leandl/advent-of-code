import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseBoardAndPath, parseCubeBoardAndPath } from "./utils";

const inputContent = await readInputContent("year-2022", "day-22", "data");

const resultPart1 = part1Run(parseBoardAndPath(inputContent));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseCubeBoardAndPath(inputContent));
console.log("Result Part 2: ", resultPart2);
