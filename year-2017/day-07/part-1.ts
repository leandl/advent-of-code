import { Program } from "./utils";

export function part1Run(programs: Program[]) {
  const allPrograms = new Set<string>();
  const childPrograms = new Set<string>();

  for (const program of programs) {
    allPrograms.add(program.name);

    for (const child of program.children) {
      childPrograms.add(child);
    }
  }

  for (const name of allPrograms) {
    if (!childPrograms.has(name)) {
      return name;
    }
  }

  throw new Error("Base program not found");
}
