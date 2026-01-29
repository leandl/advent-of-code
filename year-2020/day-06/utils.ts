export type Group = string[];

export function parseGroups(input: string): Group[] {
  return input
    .trim()
    .split("\n\n") // separa os grupos
    .map((group) =>
      group
        .split("\n") // separa as pessoas do grupo
        .map((line) => line.trim())
        .filter(Boolean)
    );
}
