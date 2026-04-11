import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseTarget } from "./utlts";

const inputContent = await readInputContent("year-2021", "day-17", "data");
// const inputContent = await readInputContent("year-2021", "day-17", "example");

const resultPart1 = part1Run(parseTarget(inputContent));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseTarget(inputContent));
console.log("Result Part 2: ", resultPart2);
