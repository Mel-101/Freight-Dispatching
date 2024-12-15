import React from 'react';
import { ChatMessage } from '../../types/chat';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <span className={`text-xs mt-1 block ${
          isUser ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
        
        {message.attachments?.map((attachment) => (
          <div
            key={attachment.id}
            className="mt-2 p-2 bg-white rounded border flex items-center space-x-2"
          >
            <span className="text-sm text-gray-600">{attachment.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}