import { ChatMessage, UserRole } from '../../types/chat';

const roleBasedResponses: Record<UserRole, Record<string, string[]>> = {
  client: {
    tracking: [
      "Your shipment is currently in transit. Here's the latest update:",
      "I can help you track your shipment. Please provide your tracking number."
    ],
    rates: [
      "I can help you get a quote for your shipment. What are the pickup and delivery locations?",
      "Our rates are competitive and transparent. Let me help you calculate the cost."
    ]
  },
  driver: {
    loads: [
      "I can help you find available loads in your area.",
      "Let me check the load board for matches based on your location and preferences."
    ],
    documents: [
      "You can easily upload your documents through our system.",
      "I'll guide you through the document submission process."
    ]
  },
  broker: {
    capacity: [
      "I can help you find available carriers in your network.",
      "Let me check current capacity and driver availability."
    ],
    rates: [
      "I'll help you calculate competitive rates for your lanes.",
      "Let's analyze current market rates for your routes."
    ]
  }
};

export function processMessage(message: string, userRole: UserRole): string {
  // In a real implementation, this would use NLP/AI to process the message
  const keywords = message.toLowerCase().split(' ');
  
  for (const [topic, responses] of Object.entries(roleBasedResponses[userRole])) {
    if (keywords.some(word => topic.includes(word))) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  return "I understand you're asking about " + message + ". Let me help you with that.";
}