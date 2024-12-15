import { RoutePoint } from '../../types/routing';

const HOURS_BETWEEN_BREAKS = 4;
const MILES_BETWEEN_FUEL = 400;

export function calculateRestStops(
  route: RoutePoint[],
  totalDuration: number
): RoutePoint[] {
  const stops: RoutePoint[] = [];
  const numStops = Math.floor(totalDuration / HOURS_BETWEEN_BREAKS);

  for (let i = 1; i <= numStops; i++) {
    const progress = i / (numStops + 1);
    const stopIndex = Math.floor(progress * route.length);
    stops.push(route[stopIndex]);
  }

  return stops;
}

export function calculateFuelStops(
  route: RoutePoint[],
  totalDistance: number
): RoutePoint[] {
  const stops: RoutePoint[] = [];
  const numStops = Math.floor(totalDistance / MILES_BETWEEN_FUEL);

  for (let i = 1; i <= numStops; i++) {
    const progress = i / (numStops + 1);
    const stopIndex = Math.floor(progress * route.length);
    stops.push(route[stopIndex]);
  }

  return stops;
}