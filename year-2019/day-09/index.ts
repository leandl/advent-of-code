import { parseNumbers } from "../../utils/parsers";
import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const inputContent = await readInputContent("year-2019", "day-09", "data");

const resultPart1 = part1Run({
  program: parseNumbers(inputContent),
  input: 1,
});
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run({
  program: parseNumbers(inputContent),
  input: 2,
});
console.log("Result Part 2: ", resultPart2);
