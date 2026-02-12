import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseFileSystem } from "./utils";

const lines = await readInputLines("year-2022", "day-07", "data");
// const lines = await readInputLines("year-2022", "day-07", "example");

const resultPart1 = part1Run(parseFileSystem(lines));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseFileSystem(lines));
console.log("Result Part 2: ", resultPart2);
