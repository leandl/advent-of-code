import { readInputLines } from "../../utils/read-input";
import { part1Run } from "./part-1";

const lines = await readInputLines("year-2022", "day-25", "data");

const resultPart1 = part1Run(lines);
console.log("Result Part 1: ", resultPart1);
