export function restoreGravityAssist(
  program: number[],
  noun: number,
  verb: number,
): number[] {
  const restored = [...program];
  restored[1] = noun;
  restored[2] = verb;
  return restored;
}
