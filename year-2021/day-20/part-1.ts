import { countLight, enhance, TrenchMap } from "./utlts";

export function part1Run({ algorithm, image }: TrenchMap) {
  const result = enhance(image, algorithm, 2);

  return countLight(result);
}
