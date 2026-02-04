export type Seed = number;
export type CategoryValue = number;
export type Range = [number, number];

export interface RangeMap {
  readonly sourceStart: CategoryValue;
  readonly destinationStart: CategoryValue;
  readonly length: number;
}

export type ConversionMap = ReadonlyArray<RangeMap>;

export type AlmanacMaps = ReadonlyArray<ConversionMap>;

export interface AlmanacInput {
  seeds: ReadonlyArray<Seed>;
  maps: AlmanacMaps;
}

export function parseInputPuzzle(input: string): AlmanacInput {
  const sections = input.trim().split("\n\n");

  const seeds: Seed[] = sections[0]
    .replace("seeds:", "")
    .trim()
    .split(/\s+/)
    .map(Number);

  const maps: AlmanacMaps = sections.slice(1).map((section) => {
    const lines = section.split("\n").slice(1);

    return lines.map<RangeMap>((line) => {
      const [destinationStart, sourceStart, length] = line
        .split(" ")
        .map(Number);

      return {
        sourceStart,
        destinationStart,
        length,
      };
    });
  });

  return { seeds, maps };
}
