import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseBanks } from "./utils";

const inputContent = await readInputContent("year-2017", "day-06");
// const inputContent = "0 2 7 0";

const banks = parseBanks(inputContent);

const resultPart1 = part1Run(banks);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(banks);
console.log("Result Part 2: ", resultPart2);
