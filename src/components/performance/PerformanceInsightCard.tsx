import React from 'react';
import { TrendingUp, AlertTriangle, Award } from 'lucide-react';
import { PerformanceInsight } from '../../types/performance';

interface PerformanceInsightCardProps {
  insight: PerformanceInsight;
}

export function PerformanceInsightCard({ insight }: PerformanceInsightCardProps) {
  const getIcon = () => {
    switch (insight.type) {
      case 'improvement':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'achievement':
        return <Award className="w-5 h-5 text-green-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (insight.type) {
      case 'improvement':
        return 'bg-blue-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'achievement':
        return 'bg-green-50';
    }
  };

  return (
    <div className={`${getBackgroundColor()} rounded-lg p-4`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">
            {insight.message}
          </h4>
          <p className="mt-1 text-sm text-gray-600">
            {insight.recommendation}
          </p>
          <div className="mt-2 flex items-center text-sm">
            <span className={`font-medium ${
              insight.impact > 0 ? 'text-green-600' :
              insight.impact < 0 ? 'text-red-600' :
              'text-gray-600'
            }`}>
              Impact: {Math.abs(insight.impact * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}