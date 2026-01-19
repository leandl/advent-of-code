function validByr(value?: string): boolean {
  if (!value || !/^\d{4}$/.test(value)) return false;
  const year = Number(value);
  return year >= 1920 && year <= 2002;
}

function validIyr(value?: string): boolean {
  if (!value || !/^\d{4}$/.test(value)) return false;
  const year = Number(value);
  return year >= 2010 && year <= 2020;
}

function validEyr(value?: string): boolean {
  if (!value || !/^\d{4}$/.test(value)) return false;
  const year = Number(value);
  return year >= 2020 && year <= 2030;
}

function validHgt(value?: string): boolean {
  if (!value) return false;

  const match = value.match(/^(\d+)(cm|in)$/);
  if (!match) return false;

  const height = Number(match[1]);
  const unit = match[2];

  if (unit === "cm") {
    return height >= 150 && height <= 193;
  }

  return height >= 59 && height <= 76;
}

function validHcl(value?: string): boolean {
  return !!value && /^#[0-9a-f]{6}$/.test(value);
}

function validEcl(value?: string): boolean {
  return (
    !!value && ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value)
  );
}

function validPid(value?: string): boolean {
  return !!value && /^\d{9}$/.test(value);
}

function isValidPassport(p: Record<string, string>): boolean {
  return (
    validByr(p.byr) &&
    validIyr(p.iyr) &&
    validEyr(p.eyr) &&
    validHgt(p.hgt) &&
    validHcl(p.hcl) &&
    validEcl(p.ecl) &&
    validPid(p.pid)
  );
}

export function part2Run(lines: string[]) {
  let validCount = 0;
  let passport: Record<string, string> = {};

  for (const line of lines) {
    if (line.trim() === "") {
      if (isValidPassport(passport)) {
        validCount++;
      }
      passport = {};
      continue;
    }

    const fields = line.split(" ");
    for (const field of fields) {
      const [key, value] = field.split(":");
      passport[key] = value;
    }
  }

  // último passaporte
  if (isValidPassport(passport)) {
    validCount++;
  }

  return validCount;
}
