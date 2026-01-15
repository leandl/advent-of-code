import { parseClaims } from "./utils";

export function part2Run(lines: string[]) {
  const claims = parseClaims(lines);

  // Mapa do tecido: "x,y" -> quantidade de claims
  const fabric = new Map<string, number>();

  // Preencher o mapa
  for (const claim of claims) {
    for (let x = claim.left; x < claim.left + claim.width; x++) {
      for (let y = claim.top; y < claim.top + claim.height; y++) {
        const key = `${x},${y}`;
        fabric.set(key, (fabric.get(key) ?? 0) + 1);
      }
    }
  }

  // Encontrar a claim sem sobreposição
  for (const claim of claims) {
    let overlaps = false;

    for (let x = claim.left; x < claim.left + claim.width && !overlaps; x++) {
      for (let y = claim.top; y < claim.top + claim.height; y++) {
        const key = `${x},${y}`;
        if ((fabric.get(key) ?? 0) > 1) {
          overlaps = true;
          break;
        }
      }
    }

    if (!overlaps) {
      return claim.id;
    }
  }

  throw new Error("Nenhuma claim sem sobreposição encontrada");
}
