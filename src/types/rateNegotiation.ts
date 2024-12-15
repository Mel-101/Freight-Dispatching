export interface NegotiationContext {
  lane: string;
  loadType: string;
  weight: number;
  pickupDate: string;
  deliveryDate: string;
  distance: number;
  urgency: 'low' | 'medium' | 'high';
}

export interface RateRecommendation {
  suggestedRate: number;
  minAcceptableRate: number;
  targetRate: number;
  maxRate: number;
  confidence: number;
  factors: NegotiationFactor[];
  strategy: NegotiationStrategy;
}

export interface NegotiationFactor {
  type: 'market' | 'historical' | 'seasonal' | 'capacity' | 'urgency';
  impact: number; // -1 to 1
  description: string;
  dataPoints?: {
    label: string;
    value: number;
  }[];
}

export interface NegotiationStrategy {
  initialOffer: number;
  steps: NegotiationStep[];
  fallbackOptions: FallbackOption[];
  talkingPoints: string[];
}

export interface NegotiationStep {
  condition: string;
  action: string;
  rate: number;
  reasoning: string;
}

export interface FallbackOption {
  type: 'alternate_date' | 'multi_load' | 'route_modification';
  description: string;
  potentialSavings: number;
  impact: string;
}