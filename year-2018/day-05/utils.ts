export function fullyReactPolymer(polymer: string): number {
  const stack: string[] = [];

  for (const unit of polymer) {
    const top = stack[stack.length - 1];

    if (top && top !== unit && top.toLowerCase() === unit.toLowerCase()) {
      stack.pop();
    } else {
      stack.push(unit);
    }
  }

  return stack.length;
}
