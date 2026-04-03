import { readInputContent } from "../../utils/read-input";
import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { parseTicketNotes } from "./utils";

const inputContent = await readInputContent("year-2020", "day-16", "data");
// const inputContent = await readInputContent("year-2020", "day-16", "example");

const resultPart1 = part1Run(parseTicketNotes(inputContent));
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(parseTicketNotes(inputContent));
console.log("Result Part 2: ", resultPart2);
