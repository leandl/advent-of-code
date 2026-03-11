import { parseList } from "../../utils/parsers";
import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { RunParams } from "./utils";

const params: RunParams = {
  steps: parseList(await readInputContent("year-2017", "day-16", "data")),
  size: 16,
};

// const params: RunParams = {
//   steps: parseList(await readInputContent("year-2017", "day-16", "example")),
//   size: 5,
// };

const resultPart1 = part1Run(params);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(params);
console.log("Result Part 2: ", resultPart2);
