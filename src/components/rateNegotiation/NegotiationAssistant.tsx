import React, { useState, useEffect } from 'react';
import { NegotiationContext, RateRecommendation } from '../../types/rateNegotiation';
import { MarketTrend } from '../../types/marketTrends';
import { RateAnalysisCard } from './RateAnalysisCard';
import { analyzeRate } from '../../utils/rateNegotiation/rateAnalyzer';

interface NegotiationAssistantProps {
  lane: string;
  loadType: string;
  weight: number;
  pickupDate: string;
  deliveryDate: string;
  distance: number;
}

export function NegotiationAssistant({
  lane,
  loadType,
  weight,
  pickupDate,
  deliveryDate,
  distance
}: NegotiationAssistantProps) {
  const [recommendation, setRecommendation] = useState<RateRecommendation | null>(null);
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium');

  useEffect(() => {
    // In a real implementation, fetch actual market data
    const mockHistoricalRates = Array.from({ length: 90 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      rate: 2500 + Math.random() * 500,
      volume: 100 + Math.random() * 50
    }));

    const mockMarketTrends: MarketTrend[] = [{
      region: 'West',
      lane,
      currentRate: 2500,
      predictedRate: 2650,
      confidence: 0.85,
      factors: [],
      historicalRates: mockHistoricalRates
    }];

    const context: NegotiationContext = {
      lane,
      loadType,
      weight,
      pickupDate,
      deliveryDate,
      distance,
      urgency
    };

    const rateRecommendation = analyzeRate(
      context,
      mockMarketTrends,
      mockHistoricalRates
    );

    setRecommendation(rateRecommendation);
  }, [lane, loadType, weight, pickupDate, deliveryDate, distance, urgency]);

  if (!recommendation) {
    return <div>Analyzing rates...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Rate Negotiation Assistant</h2>
        <select
          value={urgency}
          onChange={(e) => setUrgency(e.target.value as 'low' | 'medium' | 'high')}
          className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="low">Low Urgency</option>
          <option value="medium">Medium Urgency</option>
          <option value="high">High Urgency</option>
        </select>
      </div>

      <RateAnalysisCard recommendation={recommendation} />

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fallback Options</h3>
        <div className="space-y-4">
          {recommendation.strategy.fallbackOptions.map((option, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">{option.description}</h4>
              <p className="text-sm text-gray-600 mt-1">{option.impact}</p>
              <p className="text-sm font-medium text-green-600 mt-2">
                Potential savings: ${option.potentialSavings.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}