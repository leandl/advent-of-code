import { REQUIRED_FIELDS } from "./utils";

export function part1Run(lines: string[]) {
  let validCount = 0;
  let currentFields = new Set<string>();

  for (const line of lines) {
    if (line.trim() === "") {
      if (REQUIRED_FIELDS.every((f) => currentFields.has(f))) {
        validCount++;
      }
      currentFields.clear();
      continue;
    }

    const parts = line.split(" ");
    for (const part of parts) {
      const [key] = part.split(":");
      currentFields.add(key);
    }
  }

  // Verifica o último passaporte (caso não termine com linha em branco)
  if (REQUIRED_FIELDS.every((f) => currentFields.has(f))) {
    validCount++;
  }

  return validCount;
}
