import { applyFold, TransparentPaper } from "./utils";

export function part1Run({ coordinates, foldInstructions }: TransparentPaper) {
  const firstFold = foldInstructions[0];
  const foldedcoordinates = applyFold(coordinates, firstFold);

  return foldedcoordinates.length;
}
