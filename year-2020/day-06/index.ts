import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseGroups } from "./utils";

const inputContent = await readInputContent("year-2020", "day-06");

const groups = parseGroups(inputContent);

const resultPart1 = part1Run(groups);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(groups);
console.log("Result Part 2: ", resultPart2);
