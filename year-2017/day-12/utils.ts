export type ProgramId = number;

export type ProgramGraph = Map<ProgramId, ProgramId[]>;

export function parseProgramGraph(lines: string[]): ProgramGraph {
  const graph: ProgramGraph = new Map();

  for (const line of lines) {
    const [programPart, connectionsPart] = line.split(" <-> ");

    const programId: ProgramId = Number(programPart);
    const connectedPrograms: ProgramId[] = connectionsPart
      .split(", ")
      .map(Number);

    graph.set(programId, connectedPrograms);
  }

  return graph;
}
