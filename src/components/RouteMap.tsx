import React from 'react';
import { Map, Navigation2 } from 'lucide-react';
import { OptimizedRoute, RoutePoint } from '../types/routing';

interface RouteMapProps {
  route: OptimizedRoute;
}

export function RouteMap({ route }: RouteMapProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Route Overview</h3>
        <div className="flex items-center space-x-2">
          <Navigation2 className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">
            {route.totalDistance} miles
          </span>
        </div>
      </div>

      <div className="relative w-full h-64 bg-gray-100 rounded-lg mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <Map className="w-8 h-8 text-gray-400" />
          <span className="ml-2 text-gray-500">Map view would render here</span>
        </div>
      </div>

      <div className="space-y-4">
        {route.waypoints.map((point: RoutePoint, index: number) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              {index < route.waypoints.length - 1 && (
                <div className="w-0.5 h-full bg-blue-200" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{point.location}</p>
              <p className="text-sm text-gray-600">
                ETA: {new Date(point.estimatedArrival).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}