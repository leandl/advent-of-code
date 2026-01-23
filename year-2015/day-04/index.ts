import { createHash } from "crypto";
import { md5 } from "../../utils/function";

// const puzzleInput = "abcdef";
const puzzleInput = "iwrupvqb";

function puzzleRun(puzzleInput: string, charStartWith: string) {
  let n = 0;

  while (true) {
    const texto = `${puzzleInput}${n}`;
    const hash = md5(texto);

    if (hash.startsWith(charStartWith)) {
      break;
    }

    n += 1;
  }

  return n;
}

const resultPart1 = puzzleRun(puzzleInput, "00000");
console.log("Result Part 1: ", resultPart1);

const resultPart2 = puzzleRun(puzzleInput, "000000");
console.log("Result Part 2: ", resultPart2);
