export function parseBanks(input: string): number[] {
  return input
    .trim()
    .split(/\s+/) // um ou mais espaços (ou tabs)
    .map(Number);
}
