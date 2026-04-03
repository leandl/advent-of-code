import { isValueValidForAnyField, ParsedNotes } from "./utils";

export function part1Run({ fieldRules, nearbyTickets }: ParsedNotes) {
  let invalidValuesSum = 0;

  for (const ticket of nearbyTickets) {
    for (const value of ticket) {
      if (!isValueValidForAnyField(value, fieldRules)) {
        invalidValuesSum += value;
      }
    }
  }

  return invalidValuesSum;
}
