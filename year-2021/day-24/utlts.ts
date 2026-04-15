export type Block = {
  divZ: number;
  addX: number;
  addY: number;
};

// ---------------- PARSE ----------------

export function parseBlocks(lines: string[]): Block[] {
  if (lines.length % 18 !== 0) {
    throw new Error(`Esperado múltiplo de 18, veio ${lines.length}`);
  }

  const blocks: Block[] = [];

  for (let i = 0; i < lines.length; i += 18) {
    blocks.push({
      divZ: Number(lines[i + 4].split(" ")[2]),
      addX: Number(lines[i + 5].split(" ")[2]),
      addY: Number(lines[i + 15].split(" ")[2]),
    });
  }

  return blocks;
}
