export type LicenseNode = {
  children: LicenseNode[];
  metadata: number[];
};

function parseNode(
  data: number[],
  startIndex: number
): { node: LicenseNode; nextIndex: number } {
  let index = startIndex;

  const childCount = data[index++];
  const metadataCount = data[index++];

  const children: LicenseNode[] = [];

  for (let i = 0; i < childCount; i++) {
    const result = parseNode(data, index);
    children.push(result.node);
    index = result.nextIndex;
  }

  const metadata = data.slice(index, index + metadataCount);
  index += metadataCount;

  return {
    node: {
      children,
      metadata,
    },
    nextIndex: index,
  };
}

export function parseLicenseTree(input: string): LicenseNode {
  const numbers = input.trim().split(/\s+/).map(Number);

  const { node } = parseNode(numbers, 0);
  return node;
}
