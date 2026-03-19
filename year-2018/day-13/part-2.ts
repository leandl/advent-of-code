import {
  applyCurveTurn,
  applyIntersectionTurn,
  moveCart,
  sortCartsByReadingOrder,
  TrackMap,
} from "./utils";

export function part2Run({ carts, grid }: TrackMap) {
  while (true) {
    sortCartsByReadingOrder(carts);

    for (const cart of carts) {
      if (cart.hasCrashed) continue;

      moveCart(cart);

      // detectar colisão
      for (const other of carts) {
        if (
          other !== cart &&
          !other.hasCrashed &&
          other.position.x === cart.position.x &&
          other.position.y === cart.position.y
        ) {
          cart.hasCrashed = true;
          other.hasCrashed = true;
          break;
        }
      }

      if (cart.hasCrashed) continue;

      const trackPiece = grid[cart.position.y][cart.position.x];

      if (trackPiece === "+") {
        applyIntersectionTurn(cart);
      } else if (trackPiece === "/" || trackPiece === "\\") {
        applyCurveTurn(cart, trackPiece);
      }
    }

    // filtrar carrinhos sobreviventes
    const activeCarts = carts.filter((c) => !c.hasCrashed);

    if (activeCarts.length === 1) {
      const last = activeCarts[0];
      return `${last.position.x},${last.position.y}`;
    }
  }
}
