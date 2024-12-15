export interface Location {
  latitude: number;
  longitude: number;
  timestamp: string;
  speed: number;
  heading: number;
  accuracy: number;
}

export interface TrackingUpdate {
  id: string;
  loadId: string;
  driverId: string;
  location: Location;
  status: 'on_route' | 'delayed' | 'stopped' | 'arrived';
  estimatedArrival: string;
  delay?: {
    duration: number; // minutes
    reason: string;
  };
}

export interface Checkpoint {
  id: string;
  location: Location;
  type: 'pickup' | 'delivery' | 'rest' | 'fuel' | 'inspection';
  plannedTime: string;
  actualTime?: string;
  status: 'pending' | 'completed' | 'missed';
}

export interface TrackingSubscription {
  loadId: string;
  subscribers: {
    id: string;
    type: 'client' | 'broker' | 'dispatcher';
    notificationPreferences: NotificationPreference[];
  }[];
}