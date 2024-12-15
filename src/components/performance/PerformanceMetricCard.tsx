import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface PerformanceMetricCardProps {
  title: string;
  value: number;
  unit: string;
  trend?: number;
  target?: number;
  status?: 'success' | 'warning' | 'danger';
}

export function PerformanceMetricCard({
  title,
  value,
  unit,
  trend,
  target,
  status = 'success'
}: PerformanceMetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-600">{title}</h4>
        {status === 'warning' && (
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
        )}
        {status === 'danger' && (
          <AlertTriangle className="w-5 h-5 text-red-500" />
        )}
      </div>
      
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className="ml-1 text-sm text-gray-500">{unit}</span>
      </div>
      
      {trend !== undefined && (
        <div className="mt-2 flex items-center">
          {trend > 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm ${
            trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {Math.abs(trend)}% vs last period
          </span>
        </div>
      )}
      
      {target !== undefined && (
        <div className="mt-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Target: {target}{unit}</span>
            <span>{Math.round((value / target) * 100)}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                status === 'success' ? 'bg-green-500' :
                status === 'warning' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${Math.min(100, (value / target) * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}