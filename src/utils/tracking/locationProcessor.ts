import { Location, TrackingUpdate, Checkpoint } from '../../types/tracking';

export function calculateETA(
  currentLocation: Location,
  destination: Location,
  checkpoints: Checkpoint[]
): string {
  // In a real implementation, this would use a mapping service
  // and consider traffic, rest stops, and other factors
  const averageSpeed = 60; // mph
  const distance = calculateDistance(currentLocation, destination);
  const timeInHours = distance / averageSpeed;
  
  const eta = new Date();
  eta.setHours(eta.getHours() + timeInHours);
  
  return eta.toISOString();
}

export function calculateDistance(point1: Location, point2: Location): number {
  // Haversine formula for calculating distance between two points
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (point1.latitude * Math.PI) / 180;
  const φ2 = (point2.latitude * Math.PI) / 180;
  const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180;
  const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = (R * c) / 1609.34; // Convert to miles

  return distance;
}

export function detectDelay(
  currentLocation: Location,
  checkpoints: Checkpoint[],
  originalETA: string
): { isDelayed: boolean; duration: number; reason: string } | null {
  const nextCheckpoint = checkpoints.find(cp => cp.status === 'pending');
  if (!nextCheckpoint) return null;

  const distanceToCheckpoint = calculateDistance(
    currentLocation,
    nextCheckpoint.location
  );

  const plannedTime = new Date(nextCheckpoint.plannedTime).getTime();
  const currentTime = new Date().getTime();
  const newETA = new Date(calculateETA(currentLocation, nextCheckpoint.location, checkpoints)).getTime();

  if (newETA > plannedTime) {
    const delayMinutes = Math.round((newETA - plannedTime) / (1000 * 60));
    return {
      isDelayed: true,
      duration: delayMinutes,
      reason: 'Behind schedule based on current location and speed'
    };
  }

  return null;
}