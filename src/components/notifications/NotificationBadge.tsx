import React from 'react';
import { Bell } from 'lucide-react';
import { FreightNotification } from '../../types/notifications';

interface NotificationBadgeProps {
  notifications: FreightNotification[];
  onClick: () => void;
}

export function NotificationBadge({ notifications, onClick }: NotificationBadgeProps) {
  const unreadCount = notifications.filter(n => n.status === 'unread').length;
  const hasHighPriority = notifications.some(n => n.priority === 'high');

  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
    >
      <Bell className={`w-6 h-6 ${hasHighPriority ? 'text-red-500' : 'text-gray-600'}`} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
                        rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>
  );
}