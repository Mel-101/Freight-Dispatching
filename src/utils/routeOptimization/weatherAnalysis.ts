import { WeatherCondition } from '../../types/routing';

export function analyzeWeatherImpact(
  startLocation: string,
  endLocation: string
): WeatherCondition[] {
  // In a real app, this would fetch from a weather API
  const mockWeatherData: WeatherCondition[] = [
    {
      location: startLocation,
      condition: 'clear',
      severity: 0,
      visibility: 10
    },
    {
      location: endLocation,
      condition: 'rain',
      severity: 0.3,
      visibility: 5
    }
  ];

  return mockWeatherData;
}