import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { parseMachine } from "./utils";

const inputContent = await readInputContent("year-2017", "day-25", "data");

const resultPart1 = part1Run(parseMachine(inputContent));
console.log("Result Part 1: ", resultPart1);
