export type Coordinate = { x: number; y: number };

export type FoldInstruction = {
  direction: "x" | "y";
  position: number;
};

export type TransparentPaper = {
  coordinates: Coordinate[];
  foldInstructions: FoldInstruction[];
};

export function parseTransparentPaper(input: string): TransparentPaper {
  const [coordinatesSection, foldsSection] = input.trim().split("\n\n");

  const coordinates: Coordinate[] = coordinatesSection
    .split("\n")
    .map((line) => {
      const [x, y] = line.split(",").map(Number);
      return { x, y };
    });

  const foldInstructions: FoldInstruction[] = foldsSection
    .split("\n")
    .map((instructionLine) => {
      const match = instructionLine.match(/fold along (x|y)=(\d+)/);

      if (!match) {
        throw new Error(`Invalid fold instruction: ${instructionLine}`);
      }

      return {
        direction: match[1] as "x" | "y",
        position: Number(match[2]),
      };
    });

  return { coordinates, foldInstructions };
}

export function applyFold(
  coordinates: Coordinate[],
  fold: FoldInstruction,
): Coordinate[] {
  const result = new Set<string>();

  for (const { x, y } of coordinates) {
    let newX = x;
    let newY = y;

    if (fold.direction === "y" && y > fold.position) {
      newY = fold.position - (y - fold.position);
    } else if (fold.direction === "x" && x > fold.position) {
      newX = fold.position - (x - fold.position);
    }

    result.add(`${newX},${newY}`);
  }

  return Array.from(result).map((str) => {
    const [x, y] = str.split(",").map(Number);
    return { x, y };
  });
}
