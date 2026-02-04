import { AlmanacInput, AlmanacMaps, ConversionMap, Range, Seed } from "./utils";

function parseSeedRanges(seeds: ReadonlyArray<Seed>): Range[] {
  const ranges: Range[] = [];

  for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const length = seeds[i + 1];

    ranges.push([start, start + length - 1]);
  }

  return ranges;
}

function applyConversionMapToRanges(
  ranges: ReadonlyArray<Range>,
  map: ConversionMap
): Range[] {
  const result: Range[] = [];

  for (const range of ranges) {
    let pending: Range[] = [range];

    for (const rule of map) {
      const nextPending: Range[] = [];

      const ruleStart = rule.sourceStart;
      const ruleEnd = rule.sourceStart + rule.length - 1;
      const offset = rule.destinationStart - rule.sourceStart;

      for (const [start, end] of pending) {
        if (end < ruleStart || start > ruleEnd) {
          nextPending.push([start, end]);
          continue;
        }

        if (start < ruleStart) {
          nextPending.push([start, ruleStart - 1]);
        }

        const mappedStart = Math.max(start, ruleStart);
        const mappedEnd = Math.min(end, ruleEnd);

        result.push([mappedStart + offset, mappedEnd + offset]);

        if (end > ruleEnd) {
          nextPending.push([ruleEnd + 1, end]);
        }
      }

      pending = nextPending;
    }

    result.push(...pending);
  }

  return result;
}

function lowestLocationFromSeedRanges(
  seedRanges: ReadonlyArray<Range>,
  maps: AlmanacMaps
): number {
  let ranges = [...seedRanges];

  for (const map of maps) {
    ranges = applyConversionMapToRanges(ranges, map);
  }

  return Math.min(...ranges.map(([start, _end]) => start));
}

export function part2Run({ seeds, maps }: AlmanacInput) {
  const seedRanges = parseSeedRanges(seeds);
  return lowestLocationFromSeedRanges(seedRanges, maps);
}
