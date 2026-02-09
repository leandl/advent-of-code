import { LicenseNode } from "./utils";

function calculateNodeValue(node: LicenseNode): number {
  if (node.children.length === 0) {
    return node.metadata.reduce((sum, value) => sum + value, 0);
  }

  let value = 0;

  for (const metadataEntry of node.metadata) {
    const childIndex = metadataEntry - 1;

    if (childIndex >= 0 && childIndex < node.children.length) {
      value += calculateNodeValue(node.children[childIndex]);
    }
  }

  return value;
}

export function part2Run(root: LicenseNode) {
  return calculateNodeValue(root);
}
