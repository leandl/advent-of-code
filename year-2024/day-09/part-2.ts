export function part2Run(input: string): number {
  const disk: number[] = [];

  let fileId = 0;
  let isFile = true;

  for (const ch of input.trim()) {
    const len = Number(ch);

    if (isFile) {
      for (let i = 0; i < len; i++) disk.push(fileId);
      fileId++;
    } else {
      for (let i = 0; i < len; i++) disk.push(-1);
    }

    isFile = !isFile;
  }

  const maxFileId = fileId - 1;

  for (let id = maxFileId; id >= 0; id--) {
    // localizar arquivo
    let start = -1;
    let size = 0;

    for (let i = 0; i < disk.length; i++) {
      if (disk[i] === id) {
        if (start === -1) start = i;
        size++;
      }
    }

    if (start === -1) continue;

    // procurar espaço livre contínuo à esquerda
    let freeStart = -1;
    let freeSize = 0;

    for (let i = 0; i < start; i++) {
      if (disk[i] === -1) {
        if (freeStart === -1) freeStart = i;
        freeSize++;
        if (freeSize >= size) break;
      } else {
        freeStart = -1;
        freeSize = 0;
      }
    }

    // mover arquivo se couber
    if (freeSize >= size && freeStart !== -1) {
      // limpar posição antiga
      for (let i = start; i < start + size; i++) {
        disk[i] = -1;
      }

      // colocar na nova posição
      for (let i = 0; i < size; i++) {
        disk[freeStart + i] = id;
      }
    }
  }

  let checksum = 0;
  for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== -1) {
      checksum += i * disk[i];
    }
  }

  return checksum;
}
