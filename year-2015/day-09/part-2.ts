import {
  generateStringRoute,
  getRoutes,
  parseRoute,
  regexRouteDistances,
  Route,
} from "./utils";

export function part2Run(lines: string[]) {
  const cities = new Set<string>();
  const routeDistances = new Map<Route, number>();

  for (const line of lines) {
    const match = regexRouteDistances.exec(line);
    if (match) {
      const [cityA, cityB, distance] = parseRoute(match);

      const route1 = generateStringRoute(cityA, cityB);
      const route2 = generateStringRoute(cityB, cityA);

      cities.add(cityA);
      cities.add(cityB);

      routeDistances.set(route1, distance);
      routeDistances.set(route2, distance);
    }
  }

  let maxDistance = 0;
  const routes = getRoutes(Array.from(cities));
  for (const cities of routes) {
    const lengthWithioutLastItem = cities.length - 1;
    let distanceFinal = 0;
    for (let index = 0; index < lengthWithioutLastItem; index++) {
      const currentCity = cities[index];
      const nextCity = cities[index + 1];

      const route = generateStringRoute(currentCity, nextCity);

      if (routeDistances.has(route)) {
        distanceFinal += routeDistances.get(route)!;
      } else {
        console.log(`Route not found: ${route}`);
      }
    }

    maxDistance = Math.max(maxDistance, distanceFinal);
  }

  return maxDistance;
}
