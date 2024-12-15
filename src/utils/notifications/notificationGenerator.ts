import { 
  FreightNotification, 
  NotificationRule,
  NotificationPreference 
} from '../../types/notifications';
import { Load } from '../../types';
import { defaultNotificationRules } from './notificationRules';

export function generateLoadNotification(
  load: Load,
  preferences: NotificationPreference[]
): FreightNotification[] {
  const notifications: FreightNotification[] = [];

  defaultNotificationRules.forEach(rule => {
    if (evaluateRule(load, rule)) {
      const notification = createNotification(load, rule);
      
      // Filter based on user preferences
      preferences.forEach(pref => {
        if (shouldNotifyUser(notification, pref)) {
          notifications.push(notification);
        }
      });
    }
  });

  return notifications;
}

function evaluateRule(load: Load, rule: NotificationRule): boolean {
  const value = load[rule.condition.field as keyof Load];
  
  switch (rule.condition.operator) {
    case 'gt':
      return value > rule.condition.value;
    case 'lt':
      return value < rule.condition.value;
    case 'eq':
      return value === rule.condition.value;
    case 'contains':
      return String(value).includes(rule.condition.value);
    default:
      return false;
  }
}

function createNotification(
  load: Load,
  rule: NotificationRule
): FreightNotification {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 4); // 4-hour expiration

  return {
    id: `NOTIF${Date.now()}`,
    type: rule.type,
    priority: rule.priority,
    title: interpolateTemplate(rule.template.title, load),
    message: interpolateTemplate(rule.template.message, load),
    timestamp: new Date().toISOString(),
    expiresAt: expiresAt.toISOString(),
    metadata: {
      lane: `${load.pickupLocation} to ${load.deliveryLocation}`,
      rate: load.rate,
      loadId: load.id,
      deadline: load.date
    },
    status: 'unread'
  };
}

function interpolateTemplate(template: string, data: any): string {
  return template.replace(/{(\w+)}/g, (match, key) => data[key] || match);
}

function shouldNotifyUser(
  notification: FreightNotification,
  preference: NotificationPreference
): boolean {
  // Check if user wants this type of notification
  if (!preference.categories[getCategoryForType(notification.type)]) {
    return false;
  }

  // Check rate filter
  if (preference.filters.minRate && 
      notification.metadata.rate && 
      notification.metadata.rate < preference.filters.minRate) {
    return false;
  }

  // Check lane filter
  if (preference.filters.lanes?.length && 
      notification.metadata.lane &&
      !preference.filters.lanes.includes(notification.metadata.lane)) {
    return false;
  }

  return true;
}

function getCategoryForType(type: FreightNotification['type']): keyof NotificationPreference['categories'] {
  switch (type) {
    case 'new_load':
      return 'new_loads';
    case 'rate_increase':
      return 'rate_changes';
    case 'capacity_alert':
      return 'capacity_alerts';
    case 'market_opportunity':
      return 'market_insights';
  }
}