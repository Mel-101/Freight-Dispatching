import React from 'react';
import { NotificationPreference } from '../../types/notifications';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';

interface NotificationPreferencesProps {
  preferences: NotificationPreference;
  onUpdate: (preferences: NotificationPreference) => void;
}

export function NotificationPreferences({
  preferences,
  onUpdate
}: NotificationPreferencesProps) {
  const handleCategoryToggle = (category: keyof NotificationPreference['categories']) => {
    onUpdate({
      ...preferences,
      categories: {
        ...preferences.categories,
        [category]: !preferences.categories[category]
      }
    });
  };

  const handleChannelToggle = (channel: keyof NotificationPreference['channels']) => {
    onUpdate({
      ...preferences,
      channels: {
        ...preferences.channels,
        [channel]: !preferences.channels[channel]
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Notification Preferences
      </h3>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
          <div className="space-y-3">
            {Object.entries(preferences.categories).map(([key, enabled]) => (
              <label key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => handleCategoryToggle(key as keyof NotificationPreference['categories'])}
                  className="rounded border-gray-300 text-blue-600 
                           focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-gray-700">
                  {key.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">Notification Channels</h4>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleChannelToggle('inApp')}
              className={`flex items-center p-3 rounded-lg border ${
                preferences.channels.inApp
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-700'
              }`}
            >
              <Bell className="w-5 h-5 mr-2" />
              In-App
            </button>

            <button
              onClick={() => handleChannelToggle('email')}
              className={`flex items-center p-3 rounded-lg border ${
                preferences.channels.email
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-700'
              }`}
            >
              <Mail className="w-5 h-5 mr-2" />
              Email
            </button>

            <button
              onClick={() => handleChannelToggle('sms')}
              className={`flex items-center p-3 rounded-lg border ${
                preferences.channels.sms
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-700'
              }`}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              SMS
            </button>

            <button
              onClick={() => handleChannelToggle('push')}
              className={`flex items-center p-3 rounded-lg border ${
                preferences.channels.push
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-700'
              }`}
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Push
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">Filters</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Rate
              </label>
              <input
                type="number"
                value={preferences.filters.minRate || ''}
                onChange={(e) => onUpdate({
                  ...preferences,
                  filters: {
                    ...preferences.filters,
                    minRate: Number(e.target.value)
                  }
                })}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}