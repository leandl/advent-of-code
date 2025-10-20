import { convertLinesToMapLight, countLightOns, MapLightValue } from "./utils";

function updateMapLigth(mapLight: MapLightValue[][]): MapLightValue[][] {
  const newMapLight = Array<MapLightValue[]>();

  for (let i = 0; i < mapLight.length; i++) {
    for (let j = 0; j < mapLight[i].length; j++) {
      const char = mapLight[i][j];
      let lightOns = 0;
      for (let nI = -1; nI <= 1; nI++) {
        const subI = i + nI;
        if (subI < 0 || subI >= mapLight.length) {
          continue;
        }

        for (let nJ = -1; nJ <= 1; nJ++) {
          const subJ = j + nJ;
          if (subJ < 0 || subJ >= mapLight[i].length) {
            continue;
          }

          if (nI === 0 && nJ === 0) {
            continue;
          }

          lightOns += mapLight[subI][subJ] === "#" ? 1 : 0;
        }
      }

      if (newMapLight[i] === undefined) {
        newMapLight[i] = [];
      }

      if (char === "#" && (lightOns === 2 || lightOns === 3)) {
        newMapLight[i][j] = "#";
      } else if (char === "." && lightOns === 3) {
        newMapLight[i][j] = "#";
      } else {
        newMapLight[i][j] = ".";
      }
    }
  }

  return newMapLight;
}

export function part1Run(lines: string[]) {
  let map = convertLinesToMapLight(lines);

  for (let index = 0; index < 100; index++) {
    map = updateMapLigth(map);
  }

  return countLightOns(map);
}
