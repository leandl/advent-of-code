import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const dataText = await readInputContent("year-2015", "day-01");

const resultPart1 = part1Run(dataText);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(dataText);
console.log("Result Part 2: ", resultPart2);
