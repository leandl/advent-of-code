import { Item } from "./utils";

export function part1Run(numbers: number[]) {
  const list: Item[] = numbers.map((value, id) => ({ value, id }));
  const order = [...list]; // ordem original

  const n = list.length;

  for (const item of order) {
    const currentIndex = list.findIndex((x) => x.id === item.id);

    list.splice(currentIndex, 1);

    let newIndex = (currentIndex + item.value) % (n - 1);

    // ajuste para negativos
    if (newIndex < 0) newIndex += n - 1;

    list.splice(newIndex, 0, item);
  }

  // encontrar índice do zero
  const zeroIndex = list.findIndex((x) => x.value === 0);

  const get = (offset: number) => list[(zeroIndex + offset) % n].value;

  return get(1000) + get(2000) + get(3000);
}
