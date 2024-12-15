export type UserRole = 'client' | 'driver' | 'broker' | 'admin';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachments?: ChatAttachment[];
}

export interface ChatAttachment {
  id: string;
  type: 'image' | 'document' | 'location';
  url: string;
  name: string;
}

export interface ChatSession {
  id: string;
  userRole: UserRole;
  topic?: string;
  status: 'active' | 'resolved' | 'pending';
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface QuickReply {
  id: string;
  text: string;
  action?: () => void;
}