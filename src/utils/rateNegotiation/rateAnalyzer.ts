import { 
  NegotiationContext, 
  RateRecommendation, 
  NegotiationFactor 
} from '../../types/rateNegotiation';
import { MarketTrend, HistoricalRate } from '../../types/marketTrends';
import { predictRates } from '../marketAnalysis/ratePrediction';

export function analyzeRate(
  context: NegotiationContext,
  marketTrends: MarketTrend[],
  historicalRates: HistoricalRate[]
): RateRecommendation {
  const factors: NegotiationFactor[] = [];
  let baseRate = 0;

  // Analyze market trends
  const laneTrend = marketTrends.find(trend => trend.lane === context.lane);
  if (laneTrend) {
    const prediction = predictRates(laneTrend.historicalRates, laneTrend.currentRate);
    baseRate = prediction.predictedRate;
    
    factors.push({
      type: 'market',
      impact: (prediction.predictedRate - laneTrend.currentRate) / laneTrend.currentRate,
      description: 'Current market conditions and rate trends',
      dataPoints: [
        { label: 'Current Market Rate', value: laneTrend.currentRate },
        { label: 'Predicted Rate', value: prediction.predictedRate }
      ]
    });
  }

  // Analyze historical rates
  const avgHistoricalRate = calculateHistoricalAverage(historicalRates);
  factors.push({
    type: 'historical',
    impact: (avgHistoricalRate - baseRate) / baseRate,
    description: 'Historical rate performance in this lane',
    dataPoints: [
      { label: 'Average Historical Rate', value: avgHistoricalRate }
    ]
  });

  // Analyze seasonality
  const seasonalImpact = calculateSeasonalImpact(historicalRates, context.pickupDate);
  factors.push({
    type: 'seasonal',
    impact: seasonalImpact,
    description: 'Seasonal rate fluctuations',
  });

  // Analyze capacity
  const capacityFactor = analyzeCapacityImpact(context);
  factors.push({
    type: 'capacity',
    impact: capacityFactor,
    description: 'Current capacity and demand balance'
  });

  // Consider urgency
  const urgencyImpact = getUrgencyImpact(context.urgency);
  factors.push({
    type: 'urgency',
    impact: urgencyImpact,
    description: 'Load urgency and timing requirements'
  });

  // Calculate final rates
  const totalImpact = factors.reduce((sum, factor) => sum + factor.impact, 0);
  const suggestedRate = baseRate * (1 + totalImpact);
  
  // Calculate rate ranges
  const minAcceptableRate = suggestedRate * 0.95;
  const targetRate = suggestedRate;
  const maxRate = suggestedRate * 1.1;

  // Generate negotiation strategy
  const strategy = generateNegotiationStrategy(
    suggestedRate,
    minAcceptableRate,
    maxRate,
    factors,
    context
  );

  return {
    suggestedRate,
    minAcceptableRate,
    targetRate,
    maxRate,
    confidence: calculateConfidence(factors),
    factors,
    strategy
  };
}

function calculateHistoricalAverage(rates: HistoricalRate[]): number {
  if (rates.length === 0) return 0;
  return rates.reduce((sum, rate) => sum + rate.rate, 0) / rates.length;
}

function calculateSeasonalImpact(rates: HistoricalRate[], pickupDate: string): number {
  // Analyze rates from the same season in previous years
  const targetMonth = new Date(pickupDate).getMonth();
  const seasonalRates = rates.filter(rate => 
    new Date(rate.date).getMonth() === targetMonth
  );
  
  if (seasonalRates.length === 0) return 0;
  
  const seasonalAvg = calculateHistoricalAverage(seasonalRates);
  const overallAvg = calculateHistoricalAverage(rates);
  
  return (seasonalAvg - overallAvg) / overallAvg;
}

function analyzeCapacityImpact(context: NegotiationContext): number {
  // In a real implementation, this would analyze real-time capacity data
  const mockCapacityUtilization = 0.85; // 85% capacity utilization
  return (mockCapacityUtilization - 0.75) * 2; // Normalize to impact factor
}

function getUrgencyImpact(urgency: 'low' | 'medium' | 'high'): number {
  switch (urgency) {
    case 'high': return 0.15;
    case 'medium': return 0.05;
    case 'low': return 0;
  }
}

function calculateConfidence(factors: NegotiationFactor[]): number {
  // Calculate confidence based on factor quality and consistency
  const impactMagnitudes = factors.map(f => Math.abs(f.impact));
  const avgImpact = impactMagnitudes.reduce((a, b) => a + b, 0) / factors.length;
  const consistency = 1 - Math.sqrt(avgImpact);
  
  return Math.min(0.95, 0.7 + consistency * 0.3);
}

function generateNegotiationStrategy(
  suggestedRate: number,
  minRate: number,
  maxRate: number,
  factors: NegotiationFactor[],
  context: NegotiationContext
) {
  const initialOffer = maxRate;
  
  const steps = [
    {
      condition: "Initial offer rejected",
      action: "Highlight market data and capacity constraints",
      rate: suggestedRate * 1.05,
      reasoning: "Strong market position supported by data"
    },
    {
      condition: "Counter-offer below target",
      action: "Emphasize service quality and reliability",
      rate: suggestedRate,
      reasoning: "Maintain competitive position while ensuring profitability"
    },
    {
      condition: "Final negotiation stage",
      action: "Consider minimum acceptable rate",
      rate: minRate,
      reasoning: "Protect minimum margin requirements"
    }
  ];

  const fallbackOptions = [
    {
      type: "alternate_date" as const,
      description: "Offer flexible pickup/delivery dates",
      potentialSavings: suggestedRate * 0.05,
      impact: "Potential for better capacity matching"
    },
    {
      type: "multi_load" as const,
      description: "Propose multi-load agreement",
      potentialSavings: suggestedRate * 0.1,
      impact: "Improved efficiency and guaranteed volume"
    }
  ];

  const talkingPoints = generateTalkingPoints(factors, context);

  return {
    initialOffer,
    steps,
    fallbackOptions,
    talkingPoints
  };
}

function generateTalkingPoints(factors: NegotiationFactor[], context: NegotiationContext): string[] {
  const points: string[] = [];
  
  factors.forEach(factor => {
    if (Math.abs(factor.impact) > 0.05) {
      switch (factor.type) {
        case 'market':
          points.push(`Market rates in this lane have shown significant movement (${
            factor.impact > 0 ? 'up' : 'down'} ${
            Math.abs(Math.round(factor.impact * 100))}%)`);
          break;
        case 'seasonal':
          points.push(`Historical data shows strong seasonal demand during this period`);
          break;
        case 'capacity':
          points.push(`Current capacity utilization is trending high in this region`);
          break;
      }
    }
  });

  if (context.urgency === 'high') {
    points.push('Premium service required for time-sensitive delivery');
  }

  return points;
}