import {
  calculateHexDistance,
  CubeCoordinate,
  HEX_DIRECTION_DELTAS,
  HexDirection,
} from "./utils";

export function part1Run(path: string) {
  const directions = path.split(",") as HexDirection[];

  const position: CubeCoordinate = { x: 0, y: 0, z: 0 };

  for (const direction of directions) {
    const delta = HEX_DIRECTION_DELTAS[direction];

    position.x += delta.dx;
    position.y += delta.dy;
    position.z += delta.dz;
  }

  return calculateHexDistance(position);
}
