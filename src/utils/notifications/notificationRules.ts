import { NotificationRule } from '../../types/notifications';

export const defaultNotificationRules: NotificationRule[] = [
  {
    type: 'new_load',
    condition: {
      field: 'rate',
      operator: 'gt',
      value: 2500
    },
    priority: 'high',
    template: {
      title: 'High-Value Load Available',
      message: 'New load available at {rate} for {lane}'
    }
  },
  {
    type: 'rate_increase',
    condition: {
      field: 'percentage',
      operator: 'gt',
      value: 10
    },
    priority: 'high',
    template: {
      title: 'Significant Rate Increase',
      message: 'Rates increased by {percentage}% in {lane}'
    }
  },
  {
    type: 'capacity_alert',
    condition: {
      field: 'utilization',
      operator: 'gt',
      value: 0.9
    },
    priority: 'medium',
    template: {
      title: 'High Capacity Utilization',
      message: 'Capacity at {utilization}% in {lane}'
    }
  },
  {
    type: 'market_opportunity',
    condition: {
      field: 'potential_value',
      operator: 'gt',
      value: 1000
    },
    priority: 'high',
    template: {
      title: 'Market Opportunity',
      message: 'Potential savings of ${potential_value} in {lane}'
    }
  }
];