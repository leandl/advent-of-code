export function getMid(l: number, w: number, h: number) {
  const total = l + w + h;
  const min = Math.min(l, w, h);
  const max = Math.max(l, w, h);

  const mid = total - (min + max);
  return mid;
}
