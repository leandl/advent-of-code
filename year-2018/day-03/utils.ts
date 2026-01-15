type Claim = {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
};

function parseClaim(line: string): Claim {
  // Exemplo: "#123 @ 3,2: 5x4"
  const match = line.match(/#(\d+)\s+@\s+(\d+),(\d+):\s+(\d+)x(\d+)/);

  if (!match) {
    throw new Error(`Formato inválido: ${line}`);
  }

  return {
    id: Number(match[1]),
    left: Number(match[2]),
    top: Number(match[3]),
    width: Number(match[4]),
    height: Number(match[5]),
  };
}

export function parseClaims(lines: string[]) {
  return lines.map(parseClaim);
}
