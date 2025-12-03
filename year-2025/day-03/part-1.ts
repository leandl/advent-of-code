type DigitInfo = {
  position: number;
  digit: number;
};

const numericStringPattern = /^\d+$/;

function getOuterMaxDigits(line: string): number {
  if (line.length < 2) {
    throw new Error("Linha inválida");
  }
  if (!numericStringPattern.test(line)) {
    throw new Error("Linha deve conter apenas dígitos");
  }

  const lastPos = line.length - 1;

  const leftMax: DigitInfo = {
    position: 0,
    digit: Number(line[0]),
  };

  const rightMax: DigitInfo = {
    position: lastPos,
    digit: Number(line[lastPos]),
  };

  for (let pos = leftMax.position + 1; pos <= rightMax.position - 1; pos++) {
    const d = Number(line[pos]);
    if (d > leftMax.digit) {
      leftMax.digit = d;
      leftMax.position = pos;
    }
  }

  for (let pos = rightMax.position - 1; pos >= leftMax.position + 1; pos--) {
    const d = Number(line[pos]);
    if (d > rightMax.digit) {
      rightMax.digit = d;
      rightMax.position = pos;
    }
  }

  return leftMax.digit * 10 + rightMax.digit;
}

export function part1Run(lines: string[]) {
  let sum = 0;
  for (const line of lines) {
    sum += getOuterMaxDigits(line);
  }

  return sum;
}
