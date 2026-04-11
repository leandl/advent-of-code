import { Target } from "./utlts";

export function part1Run(target: Target): number {
  // Melhor velocidade inicial em Y
  const vy = Math.abs(target.yMin) - 1;

  // Soma de 1 até vy
  return (vy * (vy + 1)) / 2;
}
