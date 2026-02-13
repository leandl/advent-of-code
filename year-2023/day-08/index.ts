import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseNavigationMap } from "./utils";

const inputContent = await readInputContent("year-2023", "day-08", "data");
// const inputContent = await readInputContent("year-2023", "day-08", "example");

const resultPart1 = part1Run(parseNavigationMap(inputContent));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseNavigationMap(inputContent));
console.log("Result Part 2: ", resultPart2);
