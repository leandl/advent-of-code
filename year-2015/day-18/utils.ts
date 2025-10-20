export type MapLightValue = "." | "#";

export function convertLinesToMapLight(lines: string[]): MapLightValue[][] {
  const mapLight = Array<MapLightValue[]>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j] as MapLightValue;

      if (mapLight[i] === undefined) {
        mapLight[i] = [];
      }

      mapLight[i][j] = char;
    }
  }

  return mapLight;
}

export function addLightStuckOn(
  mapLight: MapLightValue[][]
): MapLightValue[][] {
  const lastI = mapLight.length - 1;
  const lastJ = mapLight[0].length - 1;

  mapLight[0][0] = "#";
  mapLight[0][lastJ] = "#";
  mapLight[lastI][0] = "#";
  mapLight[lastI][lastJ] = "#";

  return mapLight;
}

export function countLightOns(mapLight: MapLightValue[][]): number {
  let countLights = 0;
  for (const line of mapLight) {
    for (const char of line) {
      countLights += char === "#" ? 1 : 0;
    }
  }
  return countLights;
}
