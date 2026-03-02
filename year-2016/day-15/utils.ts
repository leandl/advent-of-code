export type Disc = {
  index: number;
  positions: number;
  startPosition: number;
};

const regexDisc =
  /Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)\./;

function parseDisc(line: string): Disc {
  const match = line.match(regexDisc);
  if (!match) {
    throw new Error(`Invalid disc line: ${line}`);
  }

  return {
    index: parseInt(match[1], 10),
    positions: parseInt(match[2], 10),
    startPosition: parseInt(match[3], 10),
  };
}

export function parseDiscs(lines: string[]): Disc[] {
  return lines.map(parseDisc);
}

export function addDisc(
  newDiscData: Omit<Disc, "index">,
): (discs: Disc[]) => Disc[] {
  return (discs: Disc[]): Disc[] => {
    const reindexed = discs.map((disc, i) => ({
      ...disc,
      index: i + 1,
    }));

    return [
      ...reindexed,
      {
        index: reindexed.length + 1,
        ...newDiscData,
      },
    ];
  };
}
