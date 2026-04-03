import { isValueValidForAnyField, ParsedNotes, TicketFieldRule } from "./utils";

function isValueValidForRule(value: number, rule: TicketFieldRule): boolean {
  return rule.validRanges.some(([min, max]) => value >= min && value <= max);
}

function isTicketValid(
  ticket: number[],
  fieldRules: TicketFieldRule[],
): boolean {
  return ticket.every((value) => isValueValidForAnyField(value, fieldRules));
}

function determineFieldPositions(
  validTickets: number[][],
  fieldRules: TicketFieldRule[],
): Map<number, string> {
  const fieldCount = validTickets[0].length;

  const possibleFieldsPerPosition: Map<number, Set<string>> = new Map();

  // Inicializa possibilidades
  for (let pos = 0; pos < fieldCount; pos++) {
    const possibleFields = new Set<string>();

    for (const rule of fieldRules) {
      const isValidForAll = validTickets.every((ticket) =>
        isValueValidForRule(ticket[pos], rule),
      );

      if (isValidForAll) {
        possibleFields.add(rule.fieldName);
      }
    }

    possibleFieldsPerPosition.set(pos, possibleFields);
  }

  // Resolver por eliminação
  const resolvedFields = new Map<number, string>();

  while (resolvedFields.size < fieldCount) {
    for (const [pos, possibleFields] of possibleFieldsPerPosition) {
      if (possibleFields.size === 1) {
        const [fieldName] = [...possibleFields];

        resolvedFields.set(pos, fieldName);

        // Remove dos outros
        for (const [otherPos, otherSet] of possibleFieldsPerPosition) {
          if (otherPos !== pos) {
            otherSet.delete(fieldName);
          }
        }
      }
    }
  }

  return resolvedFields;
}

export function part2Run({ fieldRules, myTicket, nearbyTickets }: ParsedNotes) {
  const validTickets = nearbyTickets.filter((ticket) =>
    isTicketValid(ticket, fieldRules),
  );

  const fieldPositions = determineFieldPositions(validTickets, fieldRules);

  let product = 1;

  for (const [pos, fieldName] of fieldPositions) {
    if (fieldName.startsWith("departure")) {
      product *= myTicket[pos];
    }
  }

  return product;
}
