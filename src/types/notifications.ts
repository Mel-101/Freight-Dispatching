export interface FreightNotification {
  id: string;
  type: 'new_load' | 'rate_increase' | 'capacity_alert' | 'market_opportunity';
  priority: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  timestamp: string;
  expiresAt: string;
  metadata: {
    lane?: string;
    rate?: number;
    deadline?: string;
    loadId?: string;
    potentialValue?: number;
  };
  status: 'unread' | 'read' | 'acted_upon' | 'expired';
}

export interface NotificationPreference {
  userId: string;
  role: 'dispatcher' | 'driver';
  categories: {
    new_loads: boolean;
    rate_changes: boolean;
    capacity_alerts: boolean;
    market_insights: boolean;
  };
  filters: {
    minRate?: number;
    lanes?: string[];
    equipmentTypes?: string[];
    distance?: number;
  };
  channels: {
    inApp: boolean;
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface NotificationRule {
  type: FreightNotification['type'];
  condition: {
    field: string;
    operator: 'gt' | 'lt' | 'eq' | 'contains';
    value: any;
  };
  priority: FreightNotification['priority'];
  template: {
    title: string;
    message: string;
  };
}