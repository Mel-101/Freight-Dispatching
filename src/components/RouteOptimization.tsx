import React, { useState, useEffect } from 'react';
import { calculateOptimalRoute } from '../utils/routeOptimization/routeCalculator';
import { OptimizedRoute } from '../types/routing';
import { RouteMap } from './RouteMap';
import { RouteAlerts } from './RouteAlerts';

interface RouteOptimizationProps {
  loadId: string;
  driverId: string;
  startLocation: string;
  endLocation: string;
}

export function RouteOptimization({
  loadId,
  driverId,
  startLocation,
  endLocation
}: RouteOptimizationProps) {
  const [route, setRoute] = useState<OptimizedRoute | null>(null);

  useEffect(() => {
    const optimizedRoute = calculateOptimalRoute(
      driverId,
      loadId,
      startLocation,
      endLocation
    );
    setRoute(optimizedRoute);
  }, [loadId, driverId, startLocation, endLocation]);

  if (!route) {
    return <div>Calculating optimal route...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RouteMap route={route} />
        </div>
        <div>
          <RouteAlerts route={route} />
        </div>
      </div>
    </div>
  );
}