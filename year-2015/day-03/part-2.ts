import { allDirections } from "./utils";

export function part2Run(dataText: string) {
  const pastLocations = new Set(["0:0"]);

  const noelPosition = {
    x: 0,
    y: 0,
  };

  const robotPosition = {
    x: 0,
    y: 0,
  };

  for (let index = 0; index < dataText.length; index++) {
    const char = dataText[index];
    const [xDirection, yDirection] = allDirections[char] || [0, 0];

    let newCoordinate: string;
    if (index % 2 === 0) {
      noelPosition.x += xDirection;
      noelPosition.y += yDirection;

      newCoordinate = `${noelPosition.x}:${noelPosition.y}`;
    } else {
      robotPosition.x += xDirection;
      robotPosition.y += yDirection;

      newCoordinate = `${robotPosition.x}:${robotPosition.y}`;
    }

    if (!pastLocations.has(newCoordinate)) {
      pastLocations.add(newCoordinate);
    }
  }

  return pastLocations.size;
}
