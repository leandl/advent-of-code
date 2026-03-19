import {
  applyCurveTurn,
  applyIntersectionTurn,
  findCollision,
  moveCart,
  sortCartsByReadingOrder,
  TrackMap,
} from "./utils";

export function part1Run({ carts, grid }: TrackMap) {
  while (true) {
    sortCartsByReadingOrder(carts);

    for (const cart of carts) {
      if (cart.hasCrashed) continue;

      moveCart(cart);

      const collision = findCollision(carts, cart);
      if (collision) {
        return `${collision.x},${collision.y}`;
      }

      const trackPiece = grid[cart.position.y][cart.position.x];

      if (trackPiece === "+") {
        applyIntersectionTurn(cart);
      } else if (trackPiece === "/" || trackPiece === "\\") {
        applyCurveTurn(cart, trackPiece);
      }
    }
  }
}
