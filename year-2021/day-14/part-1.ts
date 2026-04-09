import {
  countElements,
  getMostMinusLeast,
  runPolymerization,
  Polymer,
} from "./utils";

export function part1Run({ rules, template }: Polymer) {
  const finalPolymer = runPolymerization(template, rules, 10);
  const counts = countElements(finalPolymer);

  return getMostMinusLeast(counts);
}
