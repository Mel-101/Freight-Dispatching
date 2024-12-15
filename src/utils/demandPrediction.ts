import { HistoricalLoad, DemandForecast } from '../types/scheduling';

function calculateMovingAverage(data: number[], window: number): number {
  if (data.length < window) return data.reduce((a, b) => a + b, 0) / data.length;
  const windowData = data.slice(-window);
  return windowData.reduce((a, b) => a + b, 0) / window;
}

function calculateSeasonality(historicalData: HistoricalLoad[], location: string): number {
  const locationData = historicalData.filter(data => data.location === location);
  if (locationData.length < 7) return 1;

  const weekdayAverages = new Array(7).fill(0);
  const weekdayCounts = new Array(7).fill(0);

  locationData.forEach(data => {
    const date = new Date(data.date);
    const dayOfWeek = date.getDay();
    weekdayAverages[dayOfWeek] += data.demand;
    weekdayCounts[dayOfWeek]++;
  });

  const averages = weekdayAverages.map((sum, index) => 
    sum / (weekdayCounts[index] || 1)
  );
  const overallAverage = averages.reduce((a, b) => a + b, 0) / 7;

  return overallAverage > 0 ? Math.max(...averages) / overallAverage : 1;
}

export function predictDemand(
  historicalData: HistoricalLoad[],
  location: string,
  date: string
): DemandForecast {
  const locationData = historicalData.filter(data => data.location === location);
  
  if (locationData.length === 0) {
    return {
      date,
      location,
      predictedDemand: 0,
      confidence: 0,
      suggestedDrivers: 0
    };
  }

  const recentDemands = locationData.map(data => data.demand);
  const movingAverage = calculateMovingAverage(recentDemands, 7);
  const seasonality = calculateSeasonality(historicalData, location);
  
  const predictedDemand = Math.round(movingAverage * seasonality);
  const confidence = Math.min(0.95, 0.5 + (locationData.length * 0.05));
  
  // Calculate suggested drivers based on predicted demand and historical completion rate
  const completionRate = locationData.reduce((sum, data) => 
    sum + (data.completedLoads / data.demand), 0) / locationData.length;
  const suggestedDrivers = Math.ceil(predictedDemand * completionRate * 1.1); // 10% buffer

  return {
    date,
    location,
    predictedDemand,
    confidence,
    suggestedDrivers
  };
}