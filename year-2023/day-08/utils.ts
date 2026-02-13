type Direction = "L" | "R";

type NodeMap = Record<
  string,
  {
    L: string;
    R: string;
  }
>;

export type NavigationMap = {
  instructions: Direction[];
  network: NodeMap;
};

export function parseNavigationMap(input: string): NavigationMap {
  const [instructionsPart, networkPart] = input.trim().split("\n\n");

  const instructions = instructionsPart
    .trim()
    .split("")
    .filter((c): c is Direction => c === "L" || c === "R");

  const network: NodeMap = {};

  const lines = networkPart.trim().split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(
      /^([A-Z0-9]+)\s*=\s*\(([A-Z0-9]+),\s*([A-Z0-9]+)\)$/,
    );

    if (!match) {
      throw new Error(`Linha inválida: ${line}`);
    }

    const [, node, left, right] = match;

    network[node] = {
      L: left,
      R: right,
    };
  }

  return { instructions, network };
}
