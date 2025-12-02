type Range = [number, number];

export function* getRanges(content: string): Generator<Range> {
  for (const rangeInString of content.split(",")) {
    const [start, end] = rangeInString.split("-") as [string, string];
    yield [Number(start), Number(end)];
  }
}
