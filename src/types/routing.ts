export interface RoutePoint {
  location: string;
  latitude: number;
  longitude: number;
  estimatedArrival: string;
  estimatedDeparture: string;
}

export interface WeatherCondition {
  location: string;
  condition: 'clear' | 'rain' | 'snow' | 'storm';
  severity: number; // 0-1
  visibility: number; // miles
}

export interface TrafficCondition {
  startLocation: string;
  endLocation: string;
  congestionLevel: number; // 0-1
  averageSpeed: number; // mph
  incidents: RoadIncident[];
}

export interface RoadIncident {
  type: 'accident' | 'construction' | 'closure';
  location: string;
  severity: number; // 0-1
  estimatedDuration: number; // minutes
}

export interface OptimizedRoute {
  routeId: string;
  driver: string;
  load: string;
  waypoints: RoutePoint[];
  totalDistance: number;
  estimatedDuration: number;
  weatherAlerts: WeatherCondition[];
  trafficAlerts: TrafficCondition[];
  fuelStops: RoutePoint[];
  restStops: RoutePoint[];
  alternativeRoutes: number;
}