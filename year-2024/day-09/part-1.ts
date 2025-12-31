export function part1Run(input: string): number {
  const disk: number[] = [];

  let fileId = 0;
  let isFile = true;

  for (const ch of input.trim()) {
    const len = Number(ch);

    if (isFile) {
      for (let i = 0; i < len; i++) {
        disk.push(fileId);
      }
      fileId++;
    } else {
      for (let i = 0; i < len; i++) {
        disk.push(-1); // espaço livre
      }
    }

    isFile = !isFile;
  }

  let left = 0;
  let right = disk.length - 1;

  while (left < right) {
    while (left < disk.length && disk[left] !== -1) left++;
    while (right >= 0 && disk[right] === -1) right--;

    if (left < right) {
      disk[left] = disk[right];
      disk[right] = -1;
      left++;
      right--;
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
