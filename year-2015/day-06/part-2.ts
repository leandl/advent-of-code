import {
  Point,
  PointInGrid,
  regexToggle,
  regexTurnOff,
  regexTurnOn,
} from "./utils";

function turnOnTheLights(
  grid: Map<PointInGrid, number>,
  start: Point,
  end: Point
) {
  for (let x = start.x; x < end.x + 1; x++) {
    for (let y = start.y; y < end.y + 1; y++) {
      const pointInGrid: PointInGrid = `${x}:${y}`;

      if (!grid.has(pointInGrid)) {
        grid.set(pointInGrid, 0);
      }
      grid.set(pointInGrid, grid.get(pointInGrid)! + 1);
    }
  }
}

function turnOffTheLights(
  grid: Map<PointInGrid, number>,
  start: Point,
  end: Point
) {
  for (let x = start.x; x < end.x + 1; x++) {
    for (let y = start.y; y < end.y + 1; y++) {
      const pointInGrid: PointInGrid = `${x}:${y}`;

      if (!grid.has(pointInGrid)) {
        grid.set(pointInGrid, 0);
      }

      grid.set(pointInGrid, Math.max(grid.get(pointInGrid)! - 1, 0));
    }
  }
}

function taggleTheLights(
  grid: Map<PointInGrid, number>,
  start: Point,
  end: Point
) {
  for (let x = start.x; x < end.x + 1; x++) {
    for (let y = start.y; y < end.y + 1; y++) {
      const pointInGrid: PointInGrid = `${x}:${y}`;

      if (!grid.has(pointInGrid)) {
        grid.set(pointInGrid, 0);
      }
      grid.set(pointInGrid, grid.get(pointInGrid)! + 2);
    }
  }
}

function convertRegExpExecArrayToStartAndEndPoints(
  regExpExecArray: RegExpExecArray
): [Point, Point] {
  const start: Point = {
    x: Number(regExpExecArray[1]),
    y: Number(regExpExecArray[2]),
  };

  const end: Point = {
    x: Number(regExpExecArray[3]),
    y: Number(regExpExecArray[4]),
  };

  return [start, end];
}

export function part2Run(lines: string[]) {
  const lights = new Map<PointInGrid, number>();

  for (const instruction of lines) {
    if (regexTurnOn.test(instruction)) {
      const regexResult = regexTurnOn.exec(instruction)!;
      const [start, end] =
        convertRegExpExecArrayToStartAndEndPoints(regexResult);
      turnOnTheLights(lights, start, end);
    } else if (regexTurnOff.test(instruction)) {
      const regexResult = regexTurnOff.exec(instruction)!;
      const [start, end] =
        convertRegExpExecArrayToStartAndEndPoints(regexResult);
      turnOffTheLights(lights, start, end);
    } else if (regexToggle.test(instruction)) {
      const regexResult = regexToggle.exec(instruction)!;
      const [start, end] =
        convertRegExpExecArrayToStartAndEndPoints(regexResult);
      taggleTheLights(lights, start, end);
    }
  }

  return lights.entries().reduce((acc, [_keyof, value]) => acc + value, 0);
}
