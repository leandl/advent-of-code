export type Entry = {
  patterns: string[];
  output: string[];
};

function normalize(signal: string): string {
  return signal.split("").sort().join("");
}

export function parseEntries(lines: string[]): Entry[] {
  return lines.map((line) => {
    const [patternsPart, outputPart] = line.split(" | ");

    return {
      patterns: patternsPart.split(" ").map(normalize),
      output: outputPart.split(" ").map(normalize),
    };
  });
}
