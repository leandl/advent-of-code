import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parsePoints } from "./utils";

const lines = await readInputLines("year-2018", "day-10", "data");
// const lines = await readInputLines("year-2018", "day-10", "example");

const resultPart1 = part1Run(parsePoints(lines));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parsePoints(lines));
console.log("Result Part 2: ", resultPart2);
