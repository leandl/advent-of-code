import { readFileLineByLine } from "../../utils/read-file";

const literalNumberToNumber: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const checkLiteralNumber: Record<string, string[]> = {
  o: ["one"],
  t: ["two", "three"],
  f: ["four", "five"],
  s: ["six", "seven"],
  e: ["eight"],
  n: ["nine"],
};

function getID2(data: string): number {
  let firstTime = true;
  let firstNumber = 0;
  let lastNumber = 0;

  for (let indexData = 0; indexData < data.length; indexData++) {
    const char = data[indexData];
    let n = parseInt(char);

    if (checkLiteralNumber[char]) {
      const tests = checkLiteralNumber[char];

      for (const testLiteralNumber of tests) {
        const isValid = testLiteralNumber
          .split("")
          .every((charTest, indexTest) => {
            const newIndex = indexData + indexTest;
            if (newIndex > data.length - 1) {
              return false;
            }

            return charTest === data[newIndex];
          });

        if (isValid) {
          n = literalNumberToNumber[testLiteralNumber];
        }
      }
    }

    if (!isNaN(n)) {
      if (firstTime) {
        firstNumber = n;
        firstTime = false;
      }
      lastNumber = n;
    }
  }

  return firstNumber * 10 + lastNumber;
}

function getID1(data: string): number {
  let firstTime = true;
  let firstNumber = 0;
  let lastNumber = 0;

  for (const char of data) {
    const n = parseInt(char);

    if (!isNaN(n)) {
      if (firstTime) {
        firstNumber = n;
        firstTime = false;
      }
      lastNumber = n;
    }
  }

  return firstNumber * 10 + lastNumber;
}

let sum1 = 0;
let sum2 = 0;
for await (const line of readFileLineByLine(2023, 1)) {
  sum1 += getID1(line);
  sum2 += getID2(line);
}

console.log({
  sum1,
  sum2,
});
