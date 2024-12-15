import React from 'react';
import { Clock, AlertTriangle, CheckCircle, Truck } from 'lucide-react';
import { TrackingUpdate } from '../../types/tracking';

interface UpdatesTimelineProps {
  updates: TrackingUpdate[];
}

export function UpdatesTimeline({ updates }: UpdatesTimelineProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Tracking Updates</h3>
      
      <div className="space-y-6">
        {updates.map((update, index) => (
          <div key={update.id} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                update.status === 'delayed' ? 'bg-red-100 text-red-600' :
                update.status === 'arrived' ? 'bg-green-100 text-green-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {update.status === 'delayed' ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : update.status === 'arrived' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Truck className="w-4 h-4" />
                )}
              </div>
              {index < updates.length - 1 && (
                <div className="w-0.5 h-16 bg-gray-200 my-2" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">
                  {update.status.charAt(0).toUpperCase() + update.status.slice(1).replace('_', ' ')}
                </p>
                <span className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(update.location.timestamp).toLocaleTimeString()}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mt-1">
                Location: {update.location.latitude.toFixed(4)}, {update.location.longitude.toFixed(4)}
              </p>
              
              {update.delay && (
                <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-600">
                  {update.delay.duration} minute delay - {update.delay.reason}
                </div>
              )}
              
              <p className="text-sm text-gray-600 mt-1">
                ETA: {new Date(update.estimatedArrival).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}