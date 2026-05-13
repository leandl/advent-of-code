import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { parseGraph } from "./utils";

const lines = await readInputLines("year-2023", "day-25", "data");

const resultPart1 = part1Run(parseGraph(lines));
console.log("Result Part 1: ", resultPart1);
