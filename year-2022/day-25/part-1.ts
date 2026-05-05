const snafuToVal: Record<string, number> = {
  "2": 2,
  "1": 1,
  "0": 0,
  "-": -1,
  "=": -2,
};

const valToSnafu: Record<number, string> = {
  2: "2",
  1: "1",
  0: "0",
  [-1]: "-",
  [-2]: "=",
};

// SNAFU -> decimal
function snafuToDecimal(s: string): number {
  let result = 0;

  for (const c of s) {
    result = result * 5 + snafuToVal[c];
  }

  return result;
}

// decimal -> SNAFU
function decimalToSnafu(n: number): string {
  let result = "";
  let carry = 0;

  while (n !== 0 || carry !== 0) {
    let rem = (n % 5) + carry;
    n = Math.floor(n / 5);
    carry = 0;

    if (rem > 2) {
      rem -= 5;
      carry = 1;
    }

    result = valToSnafu[rem] + result;
  }

  return result || "0";
}

export function part1Run(lines: string[]): string {
  const sum = lines.reduce((acc, line) => {
    return acc + snafuToDecimal(line);
  }, 0);

  return decimalToSnafu(sum);
}
