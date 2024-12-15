import { AggregatedLoad, LoadSource, LoadFilter, LoadAnalysis } from '../../types/loadBoard';
import { Load } from '../../types';

export function aggregateLoads(
  loads: Load[],
  sources: LoadSource[],
  filters: LoadFilter
): AggregatedLoad[] {
  // In a real implementation, this would fetch from multiple load boards
  return loads.map(load => {
    const analysis = analyzeLoad(load);
    const source = sources[0]; // Mock source for demo

    return {
      ...load,
      sourceId: source.id,
      sourceName: source.name,
      profitability: analysis.profitability.score,
      fitScore: analysis.fit.score,
      aiRecommendation: generateRecommendation(analysis),
      tags: generateTags(load, analysis),
      expiresAt: generateExpiration(load)
    };
  }).filter(load => matchesFilters(load, filters));
}

function analyzeLoad(load: Load): LoadAnalysis {
  // In a real implementation, this would use ML models
  return {
    profitability: {
      score: 0.85,
      factors: [
        {
          type: 'rate',
          impact: 0.3,
          description: 'Above market average rate'
        },
        {
          type: 'distance',
          impact: 0.2,
          description: 'Optimal length for efficiency'
        }
      ]
    },
    fit: {
      score: 0.9,
      factors: [
        {
          type: 'location',
          impact: 0.4,
          description: 'Matches preferred lanes'
        },
        {
          type: 'equipment',
          impact: 0.3,
          description: 'Matches available equipment'
        }
      ]
    }
  };
}

function generateRecommendation(analysis: LoadAnalysis): string {
  const totalScore = (analysis.profitability.score + analysis.fit.score) / 2;
  
  if (totalScore > 0.8) {
    return 'Highly Recommended - Strong profitability and fit';
  } else if (totalScore > 0.6) {
    return 'Consider - Good opportunity with some trade-offs';
  }
  return 'Review - May require additional analysis';
}

function generateTags(load: Load, analysis: LoadAnalysis): string[] {
  const tags: string[] = [];
  
  if (analysis.profitability.score > 0.8) tags.push('high-profit');
  if (analysis.fit.score > 0.8) tags.push('perfect-fit');
  if (load.rate > 2500) tags.push('premium-rate');
  
  return tags;
}

function generateExpiration(load: Load): string {
  // Set expiration to 4 hours from now for demo
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 4);
  return expiration.toISOString();
}

function matchesFilters(load: AggregatedLoad, filters: LoadFilter): boolean {
  if (filters.origins?.length && 
      !filters.origins.includes(load.pickupLocation)) {
    return false;
  }
  
  if (filters.destinations?.length && 
      !filters.destinations.includes(load.deliveryLocation)) {
    return false;
  }
  
  if (filters.truckTypes?.length && 
      !filters.truckTypes.includes(load.truckType)) {
    return false;
  }
  
  if (filters.minRate && load.rate < filters.minRate) {
    return false;
  }
  
  if (filters.tags?.length && 
      !filters.tags.some(tag => load.tags.includes(tag))) {
    return false;
  }
  
  return true;
}