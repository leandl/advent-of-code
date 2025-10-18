import {
  Point,
  PointInGrid,
  regexToggle,
  regexTurnOff,
  regexTurnOn,
} from "./utils";

function turnOnTheLights(grid: Set<PointInGrid>, start: Point, end: Point) {
  for (let x = start.x; x < end.x + 1; x++) {
    for (let y = start.y; y < end.y + 1; y++) {
      const pointInGrid: PointInGrid = `${x}:${y}`;
      grid.add(pointInGrid);
    }
  }
}

function turnOffTheLights(grid: Set<PointInGrid>, start: Point, end: Point) {
  for (let x = start.x; x < end.x + 1; x++) {
    for (let y = start.y; y < end.y + 1; y++) {
      const pointInGrid: PointInGrid = `${x}:${y}`;
      grid.delete(pointInGrid);
    }
  }
}

function taggleTheLights(grid: Set<PointInGrid>, start: Point, end: Point) {
  for (let x = start.x; x < end.x + 1; x++) {
    for (let y = start.y; y < end.y + 1; y++) {
      const pointInGrid: PointInGrid = `${x}:${y}`;

      if (grid.has(pointInGrid)) {
        grid.delete(pointInGrid);
      } else {
        grid.add(pointInGrid);
      }
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

export function part1Run(lines: string[]) {
  const lights = new Set<PointInGrid>();

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

  return lights.size;
}
