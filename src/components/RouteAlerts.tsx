import React from 'react';
import { AlertTriangle, Cloud, Traffic } from 'lucide-react';
import { OptimizedRoute } from '../types/routing';

interface RouteAlertsProps {
  route: OptimizedRoute;
}

export function RouteAlerts({ route }: RouteAlertsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Alerts</h3>
      
      <div className="space-y-4">
        {route.weatherAlerts.map((alert, index) => (
          <div key={`weather-${index}`} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
            <Cloud className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">
                {alert.condition.charAt(0).toUpperCase() + alert.condition.slice(1)}
              </p>
              <p className="text-sm text-gray-600">
                {alert.location} - Visibility: {alert.visibility} miles
              </p>
            </div>
          </div>
        ))}
        
        {route.trafficAlerts.map((alert, index) => (
          <div key={`traffic-${index}`} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
            <Traffic className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">
                Traffic Alert
              </p>
              <p className="text-sm text-gray-600">
                Average Speed: {alert.averageSpeed} mph
              </p>
              {alert.incidents.map((incident, i) => (
                <div key={i} className="mt-2 text-sm text-gray-600">
                  <AlertTriangle className="w-4 h-4 text-red-500 inline mr-1" />
                  {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)} - 
                  {incident.estimatedDuration} min delay
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}