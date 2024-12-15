import { MarketTrend, MarketFactor, HistoricalRate } from '../../types/marketTrends';

function analyzeSeasonality(historicalRates: HistoricalRate[]): number {
  // Calculate seasonal impact using time series decomposition
  const seasonalFactors = historicalRates.map(rate => ({
    month: new Date(rate.date).getMonth(),
    rate: rate.rate
  }));

  const monthlyAverages = Array.from({ length: 12 }, (_, month) => {
    const monthRates = seasonalFactors.filter(f => f.month === month);
    return monthRates.reduce((sum, r) => sum + r.rate, 0) / monthRates.length;
  });

  const overallAverage = monthlyAverages.reduce((a, b) => a + b) / 12;
  const currentMonth = new Date().getMonth();
  
  return monthlyAverages[currentMonth] / overallAverage;
}

function analyzeDemandSupply(historicalRates: HistoricalRate[]): number {
  // Analyze recent volume trends to determine demand/supply balance
  const recentRates = historicalRates.slice(-30);
  const volumeTrend = recentRates.reduce((acc, curr, idx) => {
    if (idx === 0) return 0;
    return acc + (curr.volume - recentRates[idx - 1].volume);
  }, 0) / recentRates.length;

  return Math.min(Math.max(volumeTrend / 100, -1), 1);
}

export function predictRates(
  historicalRates: HistoricalRate[],
  currentRate: number
): { predictedRate: number; confidence: number; factors: MarketFactor[] } {
  const seasonalityImpact = analyzeSeasonality(historicalRates);
  const demandSupplyImpact = analyzeDemandSupply(historicalRates);
  
  const factors: MarketFactor[] = [
    {
      type: 'seasonal',
      impact: seasonalityImpact - 1,
      description: 'Seasonal market fluctuations'
    },
    {
      type: 'demand',
      impact: demandSupplyImpact,
      description: 'Current demand/supply balance'
    }
  ];

  // Calculate combined impact
  const totalImpact = factors.reduce((sum, factor) => sum + factor.impact, 0);
  const predictedRate = currentRate * (1 + totalImpact);
  
  // Calculate confidence based on data quality and consistency
  const confidence = 0.7 + (historicalRates.length / 1000) - 
                    Math.abs(totalImpact) * 0.2;

  return {
    predictedRate: Math.round(predictedRate * 100) / 100,
    confidence: Math.min(0.95, confidence),
    factors
  };
}