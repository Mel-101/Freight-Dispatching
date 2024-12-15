import { Load, Driver, LoadMatch } from '../types';

export function calculateMatchScore(load: Load, driver: Driver): number {
  // Simple scoring algorithm (0-100)
  let score = 0;
  
  // Match truck type (40 points)
  if (load.truckType === driver.truckType) {
    score += 40;
  }
  
  // Location proximity (30 points)
  // In a real app, we'd use actual distance calculation
  if (load.pickupLocation === driver.location) {
    score += 30;
  }
  
  // Availability (30 points)
  if (driver.availability) {
    score += 30;
  }
  
  return score;
}

export function findBestMatches(loads: Load[], drivers: Driver[]): LoadMatch[] {
  const matches: LoadMatch[] = [];
  
  loads.forEach(load => {
    if (load.status === 'available') {
      const loadMatches = drivers
        .filter(driver => driver.availability)
        .map(driver => ({
          loadId: load.id,
          driverId: driver.id,
          score: calculateMatchScore(load, driver),
          distance: 0 // In a real app, calculate actual distance
        }))
        .filter(match => match.score > 50) // Only include matches above 50%
        .sort((a, b) => b.score - a.score);
        
      if (loadMatches.length > 0) {
        matches.push(loadMatches[0]);
      }
    }
  });
  
  return matches;
}