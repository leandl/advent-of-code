import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseTransparentPaper } from "./utils";

const inputContent = await readInputContent("year-2021", "day-13", "data");
// const inputContent = await readInputContent("year-2021", "day-13", "example");

const resultPart1 = part1Run(parseTransparentPaper(inputContent));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseTransparentPaper(inputContent));
console.log("Result Part 2: ", resultPart2);
