import React, { useEffect, useState } from 'react';
import { Map, Navigation, Clock, AlertTriangle } from 'lucide-react';
import { TrackingUpdate, Checkpoint } from '../../types/tracking';
import { calculateDistance, detectDelay } from '../../utils/tracking/locationProcessor';

interface LiveTrackingMapProps {
  trackingUpdate: TrackingUpdate;
  checkpoints: Checkpoint[];
}

export function LiveTrackingMap({ trackingUpdate, checkpoints }: LiveTrackingMapProps) {
  const [delay, setDelay] = useState<{
    duration: number;
    reason: string;
  } | null>(null);

  useEffect(() => {
    const delayInfo = detectDelay(
      trackingUpdate.location,
      checkpoints,
      trackingUpdate.estimatedArrival
    );
    if (delayInfo?.isDelayed) {
      setDelay({
        duration: delayInfo.duration,
        reason: delayInfo.reason
      });
    }
  }, [trackingUpdate, checkpoints]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Live Tracking</h3>
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-sm text-gray-600">
            <Navigation className="w-4 h-4 mr-1" />
            {Math.round(trackingUpdate.location.speed)} mph
          </span>
          <span className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            ETA: {new Date(trackingUpdate.estimatedArrival).toLocaleTimeString()}
          </span>
        </div>
      </div>

      {delay && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <p className="font-medium text-red-800">Delay Detected</p>
            <p className="text-sm text-red-600">
              {delay.duration} minutes behind schedule. {delay.reason}
            </p>
          </div>
        </div>
      )}

      <div className="relative w-full h-96 bg-gray-100 rounded-lg mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <Map className="w-8 h-8 text-gray-400" />
          <span className="ml-2 text-gray-500">Map view would render here</span>
        </div>
      </div>

      <div className="space-y-4">
        {checkpoints.map((checkpoint, index) => (
          <div
            key={checkpoint.id}
            className="flex items-center space-x-4"
          >
            <div className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full ${
                checkpoint.status === 'completed' ? 'bg-green-500' :
                checkpoint.status === 'missed' ? 'bg-red-500' :
                'bg-gray-300'
              }`} />
              {index < checkpoints.length - 1 && (
                <div className="w-0.5 h-8 bg-gray-200" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">
                  {checkpoint.type.charAt(0).toUpperCase() + checkpoint.type.slice(1)}
                </p>
                <span className="text-sm text-gray-600">
                  {new Date(checkpoint.plannedTime).toLocaleTimeString()}
                </span>
              </div>
              {checkpoint.actualTime && (
                <p className="text-sm text-gray-600">
                  Actual: {new Date(checkpoint.actualTime).toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}