import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, X, Maximize2, Minimize2 } from 'lucide-react';
import { ChatMessage, ChatSession, UserRole } from '../../types/chat';
import { processMessage } from '../../utils/chatbot/messageProcessor';
import { ChatBubble } from './ChatBubble';
import { QuickReplies } from './QuickReplies';

interface ChatWindowProps {
  userRole: UserRole;
  onClose: () => void;
}

export function ChatWindow({ userRole, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add initial greeting
    const initialMessage: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: `Welcome! I'm your AI assistant. How can I help you today?`,
      timestamp: new Date().toISOString()
    };
    setMessages([initialMessage]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI processing
    setTimeout(() => {
      const response = processMessage(input, userRole);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-4 cursor-pointer"
           onClick={() => setIsMinimized(false)}>
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
          <Maximize2 className="w-6 h-6 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl flex flex-col">
      <div className="p-4 bg-blue-600 text-white rounded-t-lg flex items-center justify-between">
        <h3 className="font-semibold">AI Assistant</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 hover:bg-blue-700 rounded"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-blue-700 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <QuickReplies
        userRole={userRole}
        onSelect={(text) => setInput(text)}
      />

      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}