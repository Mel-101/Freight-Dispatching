import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatWindow } from './ChatWindow';
import { UserRole } from '../../types/chat';

interface ChatButtonProps {
  userRole: UserRole;
}

export function ChatButton({ userRole }: ChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg 
                   hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="font-medium">Need Help?</span>
        </button>
      )}

      {isOpen && (
        <ChatWindow
          userRole={userRole}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}