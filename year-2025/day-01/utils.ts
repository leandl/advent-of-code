export type RotationDirection = "L" | "R";
export type RotationInstruction = `${RotationDirection}${number}`;

export const rotationInstructionRegex = /(L|R)(\d+)/;

export function parseRotationInstruction(
  match: RegExpExecArray
): [RotationDirection, number] {
  const direction = match[1] as RotationDirection;
  const steps = Number(match[2]);
  return [direction, steps];
}

export function* getDirectionAndSteps(
  lines: string[]
): Generator<[RotationDirection, number]> {
  for (const line of lines) {
    const match = rotationInstructionRegex.exec(line);
    if (match) {
      const [direction, steps] = parseRotationInstruction(match);
      yield [direction, steps];
    }
  }
}
