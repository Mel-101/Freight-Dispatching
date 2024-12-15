import {
  DriverPerformance,
  PerformanceMetrics,
  SpeedMetrics,
  FuelMetrics,
  SafetyMetrics,
  EfficiencyMetrics,
  ComplianceMetrics
} from '../../types/performance';

export function calculateSpeedMetrics(data: any): SpeedMetrics {
  // In a real implementation, this would process actual telemetry data
  return {
    averageSpeed: 62.5,
    speedingInstances: 3,
    harshAccelerations: 2,
    harshBraking: 1
  };
}

export function calculateFuelMetrics(data: any): FuelMetrics {
  return {
    averageMpg: 6.8,
    idleTime: 45,
    fuelWasted: 2.3,
    potentialSavings: 9.20
  };
}

export function calculateSafetyMetrics(data: any): SafetyMetrics {
  return {
    safetyScore: 92,
    followingDistance: 3.2,
    laneDeviations: 4,
    distractions: 2
  };
}

export function calculateEfficiencyMetrics(data: any): EfficiencyMetrics {
  return {
    routeAdherence: 94,
    onTimeDelivery: 97,
    averageLoadTime: 42,
    averageUnloadTime: 38
  };
}

export function calculateComplianceMetrics(data: any): ComplianceMetrics {
  return {
    hoursOfService: {
      violations: 0,
      remainingHours: 4.5
    },
    breakCompliance: 100,
    logAccuracy: 98
  };
}

export function calculateOverallScore(metrics: PerformanceMetrics): number {
  // Weight different metrics based on importance
  const weights = {
    safety: 0.35,
    compliance: 0.25,
    efficiency: 0.20,
    fuel: 0.15,
    speed: 0.05
  };

  const safetyScore = metrics.safety.safetyScore;
  const complianceScore = (metrics.compliance.breakCompliance + metrics.compliance.logAccuracy) / 2;
  const efficiencyScore = (metrics.efficiency.routeAdherence + metrics.efficiency.onTimeDelivery) / 2;
  const fuelScore = Math.max(0, 100 - (metrics.fuel.idleTime / 10));
  const speedScore = Math.max(0, 100 - (metrics.speed.speedingInstances * 10));

  return Math.round(
    safetyScore * weights.safety +
    complianceScore * weights.compliance +
    efficiencyScore * weights.efficiency +
    fuelScore * weights.fuel +
    speedScore * weights.speed
  );
}