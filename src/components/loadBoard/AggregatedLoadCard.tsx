import React from 'react';
import { Clock, Tag, ThumbsUp, DollarSign } from 'lucide-react';
import { AggregatedLoad } from '../../types/loadBoard';

interface AggregatedLoadCardProps {
  load: AggregatedLoad;
  onSelect: (load: AggregatedLoad) => void;
}

export function AggregatedLoadCard({ load, onSelect }: AggregatedLoadCardProps) {
  const timeUntilExpiration = new Date(load.expiresAt).getTime() - Date.now();
  const hoursRemaining = Math.max(0, Math.floor(timeUntilExpiration / (1000 * 60 * 60)));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900">{load.truckType}</h3>
            <span className="text-sm text-gray-500">via {load.sourceName}</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            {load.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="flex items-center text-lg font-bold text-green-600">
          <DollarSign size={20} className="mr-1" />
          {load.rate.toLocaleString()}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ThumbsUp className={`w-5 h-5 ${
              load.fitScore > 0.8 ? 'text-green-500' :
              load.fitScore > 0.6 ? 'text-yellow-500' :
              'text-gray-500'
            }`} />
            <span className="text-sm font-medium">
              Fit Score: {Math.round(load.fitScore * 100)}%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {hoursRemaining}h remaining
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p className="font-medium">{load.aiRecommendation}</p>
        </div>

        <button
          onClick={() => onSelect(load)}
          className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md 
                   hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          View Details
        </button>
      </div>
    </div>
  );
}