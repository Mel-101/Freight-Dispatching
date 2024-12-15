import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { MarketTrend } from '../../types/marketTrends';

interface RateTrendChartProps {
  trend: MarketTrend;
}

export function RateTrendChart({ trend }: RateTrendChartProps) {
  const rateChange = ((trend.predictedRate - trend.currentRate) / trend.currentRate) * 100;
  const isIncrease = rateChange > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{trend.lane}</h3>
        <div className={`flex items-center ${
          isIncrease ? 'text-red-600' : 'text-green-600'
        }`}>
          {isIncrease ? (
            <TrendingUp className="w-5 h-5 mr-1" />
          ) : (
            <TrendingDown className="w-5 h-5 mr-1" />
          )}
          <span className="font-medium">
            {Math.abs(rateChange).toFixed(1)}%
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <div>
            <p className="text-sm text-gray-500">Current Rate</p>
            <p className="text-xl font-bold text-gray-900">
              ${trend.currentRate.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Predicted Rate</p>
            <p className="text-xl font-bold text-gray-900">
              ${trend.predictedRate.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Confidence</span>
            <span className="font-medium">
              {Math.round(trend.confidence * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 rounded-full h-2"
              style={{ width: `${trend.confidence * 100}%` }}
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Contributing Factors
          </h4>
          <div className="space-y-2">
            {trend.factors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {factor.type.charAt(0).toUpperCase() + factor.type.slice(1)}
                </span>
                <span className={`text-sm font-medium ${
                  factor.impact > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {factor.impact > 0 ? '+' : ''}{Math.round(factor.impact * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}