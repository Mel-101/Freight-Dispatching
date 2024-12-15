import { TrafficCondition, RoadIncident } from '../../types/routing';

export function analyzeTrafficConditions(
  startLocation: string,
  endLocation: string
): TrafficCondition {
  // In a real app, this would fetch from a traffic API
  const mockIncidents: RoadIncident[] = [
    {
      type: 'construction',
      location: `${startLocation} Highway`,
      severity: 0.4,
      estimatedDuration: 120
    }
  ];

  return {
    startLocation,
    endLocation,
    congestionLevel: 0.3,
    averageSpeed: 55,
    incidents: mockIncidents
  };
}