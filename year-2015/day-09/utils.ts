export type Route = `${string}->${string}`;

export const regexRouteDistances = /(.*) to (.*) = (\d*)/;

export function parseRoute(match: RegExpExecArray): [string, string, number] {
  return [match[1], match[2], Number(match[3])] as [string, string, number];
}

export function generateStringRoute(cityFrom: string, cityTo: string): Route {
  return `${cityFrom}->${cityTo}`;
}

export function getRoutes(cities: string[]): string[][] {
  if (cities.length === 0) {
    return [];
  }

  if (cities.length == 1) {
    return [[cities[0]]];
  }

  let routes: string[][] = [];
  for (let index = 0; index < cities.length; index++) {
    const currentCity = cities[index];
    const subCities = cities.filter((city) => currentCity !== city);

    const newRoutes = getRoutes(subCities).map((route) => [
      currentCity,
      ...route,
    ]);
    routes = [...routes, ...newRoutes];
  }

  return routes;
}
