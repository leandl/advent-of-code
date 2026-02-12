type File = {
  name: string;
  type: "FILE";
  parent: Diretory;
  size: number;
};

export type Diretory = {
  name: string;
  type: "DIRETORY";
  parent?: Diretory;
  children: Map<string, Diretory | File>;
};

export function parseFileSystem(lines: string[]): Diretory {
  const root: Diretory = {
    name: "/",
    type: "DIRETORY",
    children: new Map(),
  };

  let current: Diretory = root;

  for (const line of lines) {
    if (line.startsWith("$")) {
      const [, command, arg] = line.split(" ");

      if (command === "cd") {
        if (arg === "/") {
          current = root;
        } else if (arg === "..") {
          if (current.parent) {
            current = current.parent;
          }
        } else {
          const next = current.children.get(arg);
          if (next && next.type === "DIRETORY") {
            current = next;
          }
        }
      }

      continue;
    }

    // Saída do ls
    const [first, second] = line.split(" ");

    if (first === "dir") {
      if (!current.children.has(second)) {
        const dir: Diretory = {
          name: second,
          type: "DIRETORY",
          parent: current,
          children: new Map(),
        };

        current.children.set(second, dir);
      }
    } else {
      const size = Number(first);

      const file: File = {
        name: second,
        type: "FILE",
        size,
        parent: current,
      };

      current.children.set(second, file);
    }
  }

  return root;
}
