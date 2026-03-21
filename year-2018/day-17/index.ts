import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseGroundScan } from "./utils";

const lines = await readInputLines("year-2018", "day-17", "data");
// const lines = await readInputLines("year-2018", "day-17", "example");

const resultPart1 = part1Run(parseGroundScan(lines));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseGroundScan(lines));
console.log("Result Part 2: ", resultPart2);
