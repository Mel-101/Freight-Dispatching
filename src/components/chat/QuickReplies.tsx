import React from 'react';
import { UserRole } from '../../types/chat';

interface QuickRepliesProps {
  userRole: UserRole;
  onSelect: (text: string) => void;
}

export function QuickReplies({ userRole, onSelect }: QuickRepliesProps) {
  const quickReplies = {
    client: [
      'Track my shipment',
      'Get a quote',
      'Schedule pickup'
    ],
    driver: [
      'Find loads',
      'Upload documents',
      'Report delay'
    ],
    broker: [
      'Check capacity',
      'Rate calculator',
      'Carrier search'
    ]
  };

  return (
    <div className="px-4 py-2 border-t flex items-center space-x-2 overflow-x-auto">
      {quickReplies[userRole].map((reply, index) => (
        <button
          key={index}
          onClick={() => onSelect(reply)}
          className="flex-shrink-0 px-3 py-1 bg-gray-100 text-gray-700 rounded-full 
                   text-sm hover:bg-gray-200 transition-colors"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}