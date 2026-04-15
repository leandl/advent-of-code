import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseState } from "./utlts";

const lines = await readInputLines("year-2021", "day-23", "data");

const resultPart1 = part1Run(parseState(lines));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(lines);
console.log("Result Part 2: ", resultPart2);
