import { part1Run } from "./part-1";
import { part2Run } from "./part-2";
import { readInputJSON } from "../../utils/read-input";

const dataJSON = await readInputJSON("year-2015", "day-12");

// const dataJSON = [1, 2, 3];
// const dataJSON = { a: 2, b: 4 };
// const dataJSON = [[[3]]];
// const dataJSON = { a: { b: 4 }, c: -1 };
// const dataJSON = { a: [-1, 1] };
// const dataJSON = [-1, { a: 1 }];
// const dataJSON: any = [];
// const dataJSON = {};

const resultPart1 = part1Run(dataJSON);
console.log("Result Part 1: ", resultPart1);

const resultPart2 = part2Run(dataJSON);
console.log("Result Part 2: ", resultPart2);
