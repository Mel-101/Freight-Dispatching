import { TrackingUpdate, TrackingSubscription } from '../../types/tracking';

export type NotificationPreference = 
  | 'delay'
  | 'arrival'
  | 'departure'
  | 'checkpoint'
  | 'status_change';

export interface Notification {
  id: string;
  type: NotificationPreference;
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
  recipient: {
    id: string;
    type: 'client' | 'broker' | 'dispatcher';
  };
}

export function createNotification(
  update: TrackingUpdate,
  subscription: TrackingSubscription,
  type: NotificationPreference
): Notification[] {
  const notifications: Notification[] = [];

  subscription.subscribers.forEach(subscriber => {
    if (subscriber.notificationPreferences.includes(type)) {
      const notification: Notification = {
        id: `NOTIF${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
        type,
        message: generateMessage(update, type),
        timestamp: new Date().toISOString(),
        priority: getPriority(type),
        recipient: {
          id: subscriber.id,
          type: subscriber.type
        }
      };
      notifications.push(notification);
    }
  });

  return notifications;
}

function generateMessage(update: TrackingUpdate, type: NotificationPreference): string {
  switch (type) {
    case 'delay':
      return `Load ${update.loadId} is experiencing a ${update.delay?.duration} minute delay. Reason: ${update.delay?.reason}`;
    case 'arrival':
      return `Load ${update.loadId} has arrived at the destination`;
    case 'departure':
      return `Load ${update.loadId} has departed from the origin`;
    case 'checkpoint':
      return `Load ${update.loadId} has reached a checkpoint`;
    case 'status_change':
      return `Load ${update.loadId} status updated to: ${update.status}`;
    default:
      return `Update for load ${update.loadId}`;
  }
}

function getPriority(type: NotificationPreference): 'low' | 'medium' | 'high' {
  switch (type) {
    case 'delay':
      return 'high';
    case 'arrival':
    case 'departure':
      return 'medium';
    default:
      return 'low';
  }
}