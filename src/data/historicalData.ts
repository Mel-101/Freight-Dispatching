import { HistoricalLoad } from '../types/scheduling';

export const historicalLoads: HistoricalLoad[] = [
  {
    date: '2024-02-20',
    location: 'Los Angeles, CA',
    demand: 45,
    completedLoads: 42,
    averageRate: 2300
  },
  {
    date: '2024-02-21',
    location: 'Los Angeles, CA',
    demand: 38,
    completedLoads: 35,
    averageRate: 2250
  },
  {
    date: '2024-02-22',
    location: 'Los Angeles, CA',
    demand: 52,
    completedLoads: 48,
    averageRate: 2400
  },
  // Add more historical data for different locations
  {
    date: '2024-02-20',
    location: 'Chicago, IL',
    demand: 35,
    completedLoads: 32,
    averageRate: 2100
  },
  {
    date: '2024-02-21',
    location: 'Chicago, IL',
    demand: 40,
    completedLoads: 38,
    averageRate: 2200
  }
];