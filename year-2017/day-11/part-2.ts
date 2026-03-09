import {
  calculateHexDistance,
  CubeCoordinate,
  HEX_DIRECTION_DELTAS,
  HexDirection,
} from "./utils";

export function part2Run(path: string) {
  const directions = path.split(",") as HexDirection[];

  const position: CubeCoordinate = { x: 0, y: 0, z: 0 };
  let maxDistance = 0;

  for (const direction of directions) {
    const { dx, dy, dz } = HEX_DIRECTION_DELTAS[direction];

    position.x += dx;
    position.y += dy;
    position.z += dz;

    const currentDistance = calculateHexDistance(position);
    maxDistance = Math.max(maxDistance, currentDistance);
  }

  return maxDistance;
}
