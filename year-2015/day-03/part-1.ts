import { allDirections } from "./utils";

export function part1Run(dataText: string) {
  const pastLocations = new Set(["0:0"]);
  const currentPosition = {
    x: 0,
    y: 0,
  };

  for (const char of dataText) {
    const [xDirection, yDirection] = allDirections[char] || [0, 0];

    currentPosition.x += xDirection;
    currentPosition.y += yDirection;

    const newCoordinate = `${currentPosition.x}:${currentPosition.y}`;
    if (!pastLocations.has(newCoordinate)) {
      pastLocations.add(newCoordinate);
    }
  }

  return pastLocations.size;
}
