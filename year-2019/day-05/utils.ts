export function parseProgram(inputContent: string): number[] {
  return inputContent.split(",").map(Number);
}
