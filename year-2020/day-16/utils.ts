type ValueRange = [number, number];

export type TicketFieldRule = {
  fieldName: string;
  validRanges: ValueRange[];
};

export type ParsedNotes = {
  fieldRules: TicketFieldRule[];
  myTicket: number[];
  nearbyTickets: number[][];
};

export function parseTicketNotes(input: string): ParsedNotes {
  const [rulesSection, myTicketSection, nearbySection] = input.split("\n\n");

  const fieldRules: TicketFieldRule[] = rulesSection.split("\n").map((line) => {
    const [fieldName, rangesPart] = line.split(": ");

    const validRanges = rangesPart.split(" or ").map((rangeStr) => {
      const [min, max] = rangeStr.split("-").map(Number);
      return [min, max] as ValueRange;
    });

    return { fieldName, validRanges };
  });

  const myTicket = myTicketSection.split("\n")[1].split(",").map(Number);

  const nearbyTickets = nearbySection
    .split("\n")
    .slice(1)
    .map((line) => line.split(",").map(Number));

  return { fieldRules, myTicket, nearbyTickets };
}

export function isValueValidForAnyField(
  value: number,
  fieldRules: TicketFieldRule[],
): boolean {
  return fieldRules.some((rule) =>
    rule.validRanges.some(([min, max]) => value >= min && value <= max),
  );
}
