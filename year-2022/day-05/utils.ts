type Move = {
  count: number;
  from: number;
  to: number;
};

export type ParsedInput = {
  stacks: string[][];
  moves: Move[];
};

export function parseInputPuzzle(input: string): ParsedInput {
  const [drawing, procedure] = input.split("\n\n");

  // ---------- Parse stacks ----------
  const lines = drawing.split("\n");
  const stackIndexLine = lines.pop()!;

  const stackCount = stackIndexLine.trim().split(/\s+/).length;
  const stacks: string[][] = Array.from({ length: stackCount }, () => []);

  // Read from bottom to top
  for (let i = lines.length - 1; i >= 0; i--) {
    for (let s = 0; s < stackCount; s++) {
      const charPos = 1 + s * 4; // [A] spacing
      const crate = lines[i][charPos];
      if (crate && crate !== " ") {
        stacks[s].push(crate);
      }
    }
  }

  // ---------- Parse moves ----------
  const moves: Move[] = procedure
    .trim()
    .split("\n")
    .map((line) => {
      const [, count, from, to] = line.match(/move (\d+) from (\d+) to (\d+)/)!;

      return {
        count: Number(count),
        from: Number(from) - 1,
        to: Number(to) - 1,
      };
    });

  return { stacks, moves };
}
