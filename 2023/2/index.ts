import { readFileLineByLine } from "../../utils/read-file";

let sum = 0;
for await (const line of readFileLineByLine(2023, 2)) {
  sum += 1;
}

console.log(sum);
