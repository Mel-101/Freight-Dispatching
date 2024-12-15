export interface Load {
  id: string;
  pickupLocation: string;
  deliveryLocation: string;
  date: string;
  weight: number;
  truckType: string;
  rate: number;
  status: 'available' | 'matched' | 'in-transit' | 'delivered';
}

export interface Driver {
  id: string;
  name: string;
  location: string;
  truckType: string;
  availability: boolean;
  currentLoad?: string;
}

export interface LoadMatch {
  loadId: string;
  driverId: string;
  score: number;
  distance: number;
}