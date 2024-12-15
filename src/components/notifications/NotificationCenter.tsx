import React from 'react';
import { Bell, X, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { FreightNotification } from '../../types/notifications';

interface NotificationCenterProps {
  notifications: FreightNotification[];
  onClose: () => void;
  onNotificationClick: (notification: FreightNotification) => void;
}

export function NotificationCenter({
  notifications,
  onClose,
  onNotificationClick
}: NotificationCenterProps) {
  const getIcon = (type: FreightNotification['type']) => {
    switch (type) {
      case 'new_load':
        return <Bell className="w-5 h-5 text-blue-500" />;
      case 'rate_increase':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'capacity_alert':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'market_opportunity':
        return <CheckCircle className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="fixed right-4 top-20 w-96 bg-white rounded-lg shadow-xl">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No new notifications
          </div>
        ) : (
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => onNotificationClick(notification)}
                className={`p-4 hover:bg-gray-50 cursor-pointer ${
                  notification.status === 'unread' ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {new Date(notification.timestamp).toLocaleString()}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                        notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {notification.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}