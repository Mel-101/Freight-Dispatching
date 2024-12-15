export interface DriverPerformance {
  driverId: string;
  period: {
    start: string;
    end: string;
  };
  metrics: PerformanceMetrics;
  insights: PerformanceInsight[];
  score: number; // 0-100
}

export interface PerformanceMetrics {
  speed: SpeedMetrics;
  fuel: FuelMetrics;
  safety: SafetyMetrics;
  efficiency: EfficiencyMetrics;
  compliance: ComplianceMetrics;
}

export interface SpeedMetrics {
  averageSpeed: number;
  speedingInstances: number;
  harshAccelerations: number;
  harshBraking: number;
}

export interface FuelMetrics {
  averageMpg: number;
  idleTime: number; // minutes
  fuelWasted: number; // gallons
  potentialSavings: number; // dollars
}

export interface SafetyMetrics {
  safetyScore: number; // 0-100
  followingDistance: number; // average in seconds
  laneDeviations: number;
  distractions: number;
}

export interface EfficiencyMetrics {
  routeAdherence: number; // percentage
  onTimeDelivery: number; // percentage
  averageLoadTime: number; // minutes
  averageUnloadTime: number; // minutes
}

export interface ComplianceMetrics {
  hoursOfService: {
    violations: number;
    remainingHours: number;
  };
  breakCompliance: number; // percentage
  logAccuracy: number; // percentage
}

export interface PerformanceInsight {
  type: 'improvement' | 'warning' | 'achievement';
  category: keyof PerformanceMetrics;
  metric: string;
  message: string;
  impact: number; // -1 to 1
  recommendation: string;
}