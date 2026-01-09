import { parseNumbers } from "../../utils/parsers";
import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2020", "day-01");
// const lines = ["1721", "979", "366", "299", "675", "1456"];

const numbers = parseNumbers(lines);

const resultPart1 = part1Run(numbers);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(numbers);
console.log("Result Part 2: ", resultPart2);
