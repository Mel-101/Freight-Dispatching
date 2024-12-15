import React, { useState, useEffect } from 'react';
import { MarketTrend, MarketInsight, LaneAnalysis } from '../../types/marketTrends';
import { RateTrendChart } from './RateTrendChart';
import { MarketInsightCard } from './MarketInsightCard';
import { predictRates } from '../../utils/marketAnalysis/ratePrediction';
import { generateMarketInsights } from '../../utils/marketAnalysis/insightGenerator';

export function MarketTrendsDashboard() {
  const [trends, setTrends] = useState<MarketTrend[]>([]);
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  useEffect(() => {
    // In a real implementation, fetch actual market data
    const mockHistoricalRates = Array.from({ length: 90 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      rate: 2500 + Math.random() * 500,
      volume: 100 + Math.random() * 50
    }));

    const mockTrends: MarketTrend[] = [
      {
        region: 'West',
        lane: 'LA to Phoenix',
        currentRate: 2500,
        predictedRate: 2650,
        confidence: 0.85,
        factors: [],
        historicalRates: mockHistoricalRates
      },
      {
        region: 'Midwest',
        lane: 'Chicago to Detroit',
        currentRate: 1800,
        predictedRate: 1750,
        confidence: 0.78,
        factors: [],
        historicalRates: mockHistoricalRates
      }
    ];

    // Calculate predictions for each trend
    const updatedTrends = mockTrends.map(trend => {
      const prediction = predictRates(trend.historicalRates, trend.currentRate);
      return {
        ...trend,
        predictedRate: prediction.predictedRate,
        confidence: prediction.confidence,
        factors: prediction.factors
      };
    });

    const mockLaneAnalyses: LaneAnalysis[] = [
      {
        origin: 'Los Angeles',
        destination: 'Phoenix',
        distance: 373,
        averageRate: 2500,
        rateRange: { min: 2200, max: 2800 },
        volatility: 0.15,
        seasonality: []
      }
    ];

    setTrends(updatedTrends);
    setInsights(generateMarketInsights(updatedTrends, mockLaneAnalyses));
  }, []);

  const filteredTrends = selectedRegion === 'all'
    ? trends
    : trends.filter(t => t.region === selectedRegion);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Market Trends</h2>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Regions</option>
            <option value="West">West</option>
            <option value="Midwest">Midwest</option>
            <option value="Northeast">Northeast</option>
            <option value="Southeast">Southeast</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrends.map((trend, index) => (
            <RateTrendChart key={index} trend={trend} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Market Insights
        </h3>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <MarketInsightCard key={index} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
}