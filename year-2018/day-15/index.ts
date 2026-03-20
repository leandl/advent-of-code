import { createGridFactory, parseGrid } from "../../utils/parsers";
import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";

const lines = await readInputLines("year-2018", "day-15", "data");
// const lines = await readInputLines("year-2018", "day-15", "example");

const resultPart1 = part1Run(parseGrid(lines));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(createGridFactory(lines));
console.log("Result Part 2: ", resultPart2);
