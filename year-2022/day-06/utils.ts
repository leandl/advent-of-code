export function findMarker(input: string, size: number): number {
  const stream = input.trim();

  for (let i = size; i <= stream.length; i++) {
    const window = stream.slice(i - size, i);
    if (new Set(window).size === size) {
      return i;
    }
  }

  throw new Error("Marker not found");
}
