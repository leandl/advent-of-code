function dragonExpand(data: string, targetLength: number): string {
  while (data.length < targetLength) {
    const b = data
      .split("")
      .reverse()
      .map((c) => (c === "0" ? "1" : "0"))
      .join("");

    data = data + "0" + b;
  }

  return data.slice(0, targetLength);
}

function checksum(data: string): string {
  while (data.length % 2 === 0) {
    let next = "";

    for (let i = 0; i < data.length; i += 2) {
      next += data[i] === data[i + 1] ? "1" : "0";
    }

    data = next;
  }

  return data;
}

export function part1Run(initialState: string, diskLength: number) {
  const filled = dragonExpand(initialState, diskLength);
  return checksum(filled);
}
