export type HexDirection = "n" | "ne" | "se" | "s" | "sw" | "nw";

export type CubeCoordinate = {
  x: number;
  y: number;
  z: number;
};

type CubeDelta = {
  dx: number;
  dy: number;
  dz: number;
};

export const HEX_DIRECTION_DELTAS: Record<HexDirection, CubeDelta> = {
  n: { dx: 0, dy: 1, dz: -1 },
  ne: { dx: 1, dy: 0, dz: -1 },
  se: { dx: 1, dy: -1, dz: 0 },
  s: { dx: 0, dy: -1, dz: 1 },
  sw: { dx: -1, dy: 0, dz: 1 },
  nw: { dx: -1, dy: 1, dz: 0 },
};

export function calculateHexDistance(position: CubeCoordinate): number {
  return (
    (Math.abs(position.x) + Math.abs(position.y) + Math.abs(position.z)) / 2
  );
}
