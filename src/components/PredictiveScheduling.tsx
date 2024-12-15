import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { DemandForecast } from '../types/scheduling';
import { historicalLoads } from '../data/historicalData';
import { predictDemand } from '../utils/demandPrediction';
import { DemandForecastCard } from './DemandForecastCard';

export function PredictiveScheduling() {
  const [forecasts, setForecasts] = useState<DemandForecast[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    const locations = [...new Set(historicalLoads.map(load => load.location))];
    const newForecasts = locations.map(location =>
      predictDemand(historicalLoads, location, selectedDate)
    );
    setForecasts(newForecasts);
  }, [selectedDate]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Demand Forecast</h2>
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forecasts.map((forecast, index) => (
          <DemandForecastCard key={index} forecast={forecast} />
        ))}
      </div>
    </div>
  );
}