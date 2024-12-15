import React from 'react';
import { BarChart, Users, Percent } from 'lucide-react';
import { DemandForecast } from '../types/scheduling';

interface DemandForecastCardProps {
  forecast: DemandForecast;
}

export function DemandForecastCard({ forecast }: DemandForecastCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{forecast.location}</h3>
        <span className="text-sm text-gray-500">{forecast.date}</span>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-sm text-gray-600">Predicted Demand</span>
          </div>
          <span className="font-semibold">{forecast.predictedDemand} loads</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm text-gray-600">Suggested Drivers</span>
          </div>
          <span className="font-semibold">{forecast.suggestedDrivers}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Percent className="w-5 h-5 text-purple-500 mr-2" />
            <span className="text-sm text-gray-600">Confidence</span>
          </div>
          <span className="font-semibold">
            {Math.round(forecast.confidence * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}