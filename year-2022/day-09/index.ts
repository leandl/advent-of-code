import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseMotions } from "./utils";

const lines = await readInputLines("year-2022", "day-09", "data");

const resultPart1 = part1Run(parseMotions(lines));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseMotions(lines));
console.log("Result Part 2: ", resultPart2);
