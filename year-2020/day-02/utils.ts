type PasswordPolicy = {
  min: number;
  max: number;
  letter: string;
  password: string;
};

function parsePasswordPolicy(line: string): PasswordPolicy {
  const [policyPart, password] = line.split(": ");
  const [rangePart, letter] = policyPart.split(" ");
  const [min, max] = rangePart.split("-").map(Number);

  return {
    min,
    max,
    letter,
    password,
  };
}

export function parseInputPuzzle(lines: string[]): PasswordPolicy[] {
  return lines.map(parsePasswordPolicy);
}
