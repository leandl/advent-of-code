export type LocationId = number;

type LocationLists = readonly [left: LocationId[], right: LocationId[]];

export function parseLocationLists(lines: string[]): LocationLists {
  const left: LocationId[] = [];
  const right: LocationId[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const [leftId, rightId] = line.split(/\s+/).map(Number);

    if (Number.isNaN(leftId) || Number.isNaN(rightId)) {
      throw new Error(`Invalid location IDs: "${rawLine}"`);
    }

    left.push(leftId);
    right.push(rightId);
  }

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  return [left, right];
}
