import React from 'react';
import { TrendingUp, AlertTriangle, LineChart } from 'lucide-react';
import { MarketInsight } from '../../types/marketTrends';

interface MarketInsightCardProps {
  insight: MarketInsight;
}

export function MarketInsightCard({ insight }: MarketInsightCardProps) {
  const getIcon = () => {
    switch (insight.type) {
      case 'opportunity':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'risk':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'trend':
        return <LineChart className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (insight.type) {
      case 'opportunity':
        return 'bg-green-50';
      case 'risk':
        return 'bg-red-50';
      case 'trend':
        return 'bg-blue-50';
    }
  };

  return (
    <div className={`${getBackgroundColor()} rounded-lg p-4`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">
              {insight.lane}
            </h4>
            <span className={`text-sm font-medium ${
              insight.impact > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {insight.impact > 0 ? '+' : ''}{Math.round(insight.impact * 100)}%
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            {insight.message}
          </p>
          <p className="mt-2 text-sm font-medium text-gray-700">
            Recommended Action:
          </p>
          <p className="text-sm text-gray-600">
            {insight.action}
          </p>
        </div>
      </div>
    </div>
  );
}