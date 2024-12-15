import React, { useState, useEffect } from 'react';
import { LiveTrackingMap } from './LiveTrackingMap';
import { UpdatesTimeline } from './UpdatesTimeline';
import { TrackingUpdate, Checkpoint } from '../../types/tracking';

interface TrackingDashboardProps {
  loadId: string;
  driverId: string;
}

export function TrackingDashboard({ loadId, driverId }: TrackingDashboardProps) {
  const [updates, setUpdates] = useState<TrackingUpdate[]>([]);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [currentUpdate, setCurrentUpdate] = useState<TrackingUpdate | null>(null);

  useEffect(() => {
    // In a real implementation, this would subscribe to real-time updates
    // For demo purposes, we'll create some mock data
    const mockCheckpoints: Checkpoint[] = [
      {
        id: 'CP1',
        location: {
          latitude: 34.0522,
          longitude: -118.2437,
          timestamp: new Date().toISOString(),
          speed: 0,
          heading: 0,
          accuracy: 10
        },
        type: 'pickup',
        plannedTime: new Date().toISOString(),
        actualTime: new Date().toISOString(),
        status: 'completed'
      },
      {
        id: 'CP2',
        location: {
          latitude: 33.7490,
          longitude: -115.2434,
          timestamp: new Date().toISOString(),
          speed: 0,
          heading: 90,
          accuracy: 10
        },
        type: 'rest',
        plannedTime: new Date(Date.now() + 3 * 3600000).toISOString(),
        status: 'pending'
      },
      {
        id: 'CP3',
        location: {
          latitude: 33.4484,
          longitude: -112.0740,
          timestamp: new Date().toISOString(),
          speed: 0,
          heading: 90,
          accuracy: 10
        },
        type: 'delivery',
        plannedTime: new Date(Date.now() + 6 * 3600000).toISOString(),
        status: 'pending'
      }
    ];

    setCheckpoints(mockCheckpoints);

    // Simulate real-time updates
    const mockUpdate: TrackingUpdate = {
      id: 'TU1',
      loadId,
      driverId,
      location: {
        latitude: 34.0522,
        longitude: -116.2437,
        timestamp: new Date().toISOString(),
        speed: 65,
        heading: 90,
        accuracy: 10
      },
      status: 'on_route',
      estimatedArrival: new Date(Date.now() + 6 * 3600000).toISOString()
    };

    setCurrentUpdate(mockUpdate);
    setUpdates([mockUpdate]);

    // Simulate periodic updates
    const interval = setInterval(() => {
      const newUpdate: TrackingUpdate = {
        ...mockUpdate,
        id: `TU${Date.now()}`,
        location: {
          ...mockUpdate.location,
          longitude: mockUpdate.location.longitude + 0.1,
          timestamp: new Date().toISOString()
        }
      };
      setCurrentUpdate(newUpdate);
      setUpdates(prev => [...prev, newUpdate]);
    }, 30000);

    return () => clearInterval(interval);
  }, [loadId, driverId]);

  if (!currentUpdate) {
    return <div>Loading tracking data...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <LiveTrackingMap
          trackingUpdate={currentUpdate}
          checkpoints={checkpoints}
        />
      </div>
      <div>
        <UpdatesTimeline updates={updates} />
      </div>
    </div>
  );
}