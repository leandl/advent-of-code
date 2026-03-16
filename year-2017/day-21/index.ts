import { parseGrid } from "../../utils/parsers";
import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseRules } from "./utils";

const gridLines = await readInputLines("year-2017", "day-21", "grid");
const ruleLines = await readInputLines("year-2017", "day-21", "data");

const resultPart1 = part1Run(parseGrid(gridLines), parseRules(ruleLines));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseGrid(gridLines), parseRules(ruleLines));
console.log("Result Part 2: ", resultPart2);
