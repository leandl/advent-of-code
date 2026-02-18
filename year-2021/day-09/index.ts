import { parseGrid } from "../../utils/parsers";
import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2021", "day-09", "data");
// const lines = await readInputLines("year-2021", "day-09", "example");

const resultPart1 = part1Run(parseGrid(lines, (c) => Number(c)));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseGrid(lines, (c) => Number(c)));
console.log("Result Part 2: ", resultPart2);
