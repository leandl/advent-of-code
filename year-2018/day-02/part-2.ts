export function part2Run(lines: string[]) {
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const id1 = lines[i];
      const id2 = lines[j];

      let diffCount = 0;
      let common = "";

      for (let k = 0; k < id1.length; k++) {
        if (id1[k] === id2[k]) {
          common += id1[k];
        } else {
          diffCount++;
          if (diffCount > 1) break;
        }
      }

      if (diffCount === 1) {
        return common;
      }
    }
  }

  throw new Error("Nenhum par válido encontrado");
}
