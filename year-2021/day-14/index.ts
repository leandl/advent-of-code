import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parsePolymer } from "./utils";

const inputContent = await readInputContent("year-2021", "day-14", "data");
// const inputContent = await readInputContent("year-2021", "day-14", "example");

const resultPart1 = part1Run(parsePolymer(inputContent));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parsePolymer(inputContent));
console.log("Result Part 2: ", resultPart2);
