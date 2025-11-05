import { modPow, PositionGrid } from "./utils";

function getCode(row: number, col: number): number {
  const start = 20151125;
  const factor = 252533;
  const mod = 33554393;

  // 1 Calcula o índice n (posição na sequência)
  const diagonal = row + col - 1;
  const n = (diagonal * (diagonal - 1)) / 2 + col;

  // 2 Calcula (factor^(n-1)) % mod usando exponenciação modular rápida
  const power = modPow(factor, n - 1, mod);

  // 3 Calcula o código final
  return (start * power) % mod;
}

export function part1Run(p: PositionGrid) {
  return getCode(p.r, p.c);
}
