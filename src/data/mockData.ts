import { Load, Driver } from '../types';

export const mockLoads: Load[] = [
  {
    id: 'L1',
    pickupLocation: 'Los Angeles, CA',
    deliveryLocation: 'Phoenix, AZ',
    date: '2024-03-20',
    weight: 25000,
    truckType: 'Dry Van',
    rate: 2500,
    status: 'available'
  },
  {
    id: 'L2',
    pickupLocation: 'Seattle, WA',
    deliveryLocation: 'Portland, OR',
    date: '2024-03-21',
    weight: 18000,
    truckType: 'Reefer',
    rate: 1800,
    status: 'available'
  },
  {
    id: 'L3',
    pickupLocation: 'Chicago, IL',
    deliveryLocation: 'Detroit, MI',
    date: '2024-03-22',
    weight: 22000,
    truckType: 'Flatbed',
    rate: 2200,
    status: 'available'
  }
];

export const mockDrivers: Driver[] = [
  {
    id: 'D1',
    name: 'John Smith',
    location: 'Los Angeles, CA',
    truckType: 'Dry Van',
    availability: true
  },
  {
    id: 'D2',
    name: 'Sarah Johnson',
    location: 'Seattle, WA',
    truckType: 'Reefer',
    availability: true
  },
  {
    id: 'D3',
    name: 'Mike Wilson',
    location: 'Chicago, IL',
    truckType: 'Flatbed',
    availability: true
  }
];