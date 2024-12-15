export interface HistoricalLoad {
  date: string;
  location: string;
  demand: number;
  completedLoads: number;
  averageRate: number;
}

export interface DemandForecast {
  date: string;
  location: string;
  predictedDemand: number;
  confidence: number;
  suggestedDrivers: number;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  availableDrivers: number;
  predictedDemand: number;
  utilization: number;
}