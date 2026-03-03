import { readInputContent } from "../../utils/read-input";
import { countSafeTiles } from "./utils";

const inputContent = await readInputContent("year-2016", "day-18", "data");

const resultPart1 = countSafeTiles(inputContent);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = countSafeTiles(inputContent, 400_000);
console.log("Result Part 2: ", resultPart2);
