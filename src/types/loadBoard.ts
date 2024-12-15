export interface LoadSource {
  id: string;
  name: string;
  type: 'dat' | 'truckstop' | 'internal' | '123loadboard';
  enabled: boolean;
}

export interface AggregatedLoad extends Load {
  sourceId: string;
  sourceName: string;
  profitability: number;
  fitScore: number;
  aiRecommendation: string;
  tags: string[];
  expiresAt: string;
}

export interface LoadFilter {
  origins?: string[];
  destinations?: string[];
  truckTypes?: string[];
  minRate?: number;
  maxDeadhead?: number;
  pickupDate?: string;
  deliveryDate?: string;
  tags?: string[];
}

export interface LoadAnalysis {
  profitability: {
    score: number;
    factors: {
      type: string;
      impact: number;
      description: string;
    }[];
  };
  fit: {
    score: number;
    factors: {
      type: string;
      impact: number;
      description: string;
    }[];
  };
}