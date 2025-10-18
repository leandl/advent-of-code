export const regexTurnOn = /turn on (\d*),(\d*) through (\d*),(\d*)/;
export const regexTurnOff = /turn off (\d*),(\d*) through (\d*),(\d*)/;
export const regexToggle = /toggle (\d*),(\d*) through (\d*),(\d*)/;

export type PointInGrid = `${number}:${number}`;
export type Point = {
  x: number;
  y: number;
};
