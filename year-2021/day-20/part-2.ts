import { countLight, enhance, TrenchMap } from "./utlts";

export function part2Run({ algorithm, image }: TrenchMap) {
  const result = enhance(image, algorithm, 50);

  return countLight(result);
}
