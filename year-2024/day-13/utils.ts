export type Machine = {
  ax: bigint;
  ay: bigint;
  bx: bigint;
  by: bigint;
  px: bigint;
  py: bigint;
};

export function parseMachines(input: string, offset: bigint = 0n): Machine[] {
  return input
    .trim()
    .split("\n\n")
    .map((block) => {
      const lines = block.split("\n");

      const [ax, ay] = lines[0].match(/-?\d+/g)!.map((n) => BigInt(n));
      const [bx, by] = lines[1].match(/-?\d+/g)!.map((n) => BigInt(n));
      let [px, py] = lines[2].match(/-?\d+/g)!.map((n) => BigInt(n));

      px += offset;
      py += offset;

      return { ax, ay, bx, by, px, py };
    });
}

export function solveMachine(m: Machine): bigint | null {
  const { ax, ay, bx, by, px, py } = m;

  const D = ax * by - ay * bx;
  if (D === 0n) return null;

  const aNum = px * by - py * bx;
  const bNum = ax * py - ay * px;

  if (aNum % D !== 0n || bNum % D !== 0n) return null;

  const a = aNum / D;
  const b = bNum / D;

  if (a < 0n || b < 0n) return null;

  return a * 3n + b;
}
