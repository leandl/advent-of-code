export type Packet = number | Packet[];
export type PacketPair = [Packet, Packet];

export function parsePacketPairs(input: string): PacketPair[] {
  return input
    .trim()
    .split("\n\n")
    .map((block) => {
      const [leftStr, rightStr] = block.split("\n");

      const left = JSON.parse(leftStr) as Packet;
      const right = JSON.parse(rightStr) as Packet;

      return [left, right];
    });
}

export function parsePackets(input: string): Packet[] {
  return input
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line) as Packet);
}
