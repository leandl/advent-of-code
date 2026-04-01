import { parseNumbers } from "../../utils/parsers";
import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";

const inputContent = await readInputContent("year-2019", "day-25", "data");

const resultPart1 = part1Run(parseNumbers(inputContent));
console.log("Result Part 1: ", resultPart1);
