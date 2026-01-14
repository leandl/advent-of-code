export function part1Run(n: number) {
  if (n === 1) return 0;

  // Descobrir o anel (layer)
  let layer = Math.ceil((Math.sqrt(n) - 1) / 2);

  // Tamanho do lado do quadrado desse anel
  let sideLength = layer * 2;

  // Maior valor do anel
  let maxValue = Math.pow(2 * layer + 1, 2);

  // Centros dos quatro lados
  let centers = [
    maxValue - layer,
    maxValue - layer - sideLength,
    maxValue - layer - 2 * sideLength,
    maxValue - layer - 3 * sideLength,
  ];

  // Menor distância até um centro
  let minDistanceToCenter = Math.min(
    ...centers.map((center) => Math.abs(n - center))
  );

  // Distância de Manhattan
  return layer + minDistanceToCenter;
}
