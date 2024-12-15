import { MarketTrend, MarketInsight, LaneAnalysis } from '../../types/marketTrends';

export function generateMarketInsights(
  trends: MarketTrend[],
  laneAnalyses: LaneAnalysis[]
): MarketInsight[] {
  const insights: MarketInsight[] = [];

  // Analyze rate opportunities
  trends.forEach(trend => {
    const rateChange = (trend.predictedRate - trend.currentRate) / trend.currentRate;
    
    if (rateChange > 0.05 && trend.confidence > 0.7) {
      insights.push({
        type: 'opportunity',
        lane: trend.lane,
        message: `Expected ${Math.round(rateChange * 100)}% rate increase in ${trend.lane}`,
        impact: rateChange,
        action: 'Consider securing capacity now for future loads'
      });
    }
  });

  // Analyze market risks
  laneAnalyses.forEach(lane => {
    if (lane.volatility > 0.2) {
      insights.push({
        type: 'risk',
        lane: `${lane.origin} to ${lane.destination}`,
        message: `High rate volatility in this lane`,
        impact: -lane.volatility,
        action: 'Consider rate contracts or alternative lanes'
      });
    }
  });

  // Identify emerging trends
  trends.forEach(trend => {
    const significantFactors = trend.factors.filter(f => Math.abs(f.impact) > 0.1);
    significantFactors.forEach(factor => {
      insights.push({
        type: 'trend',
        lane: trend.lane,
        message: `${factor.type.charAt(0).toUpperCase() + factor.type.slice(1)} 
                 factor affecting rates: ${factor.description}`,
        impact: factor.impact,
        action: factor.impact > 0 ? 'Monitor for rate increases' : 'Look for cost savings'
      });
    });
  });

  return insights.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));
}