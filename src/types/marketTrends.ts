export interface MarketTrend {
  region: string;
  lane: string;
  currentRate: number;
  predictedRate: number;
  confidence: number;
  factors: MarketFactor[];
  historicalRates: HistoricalRate[];
}

export interface MarketFactor {
  type: 'demand' | 'capacity' | 'fuel' | 'seasonal' | 'weather' | 'economic';
  impact: number; // -1 to 1
  description: string;
}

export interface HistoricalRate {
  date: string;
  rate: number;
  volume: number;
}

export interface LaneAnalysis {
  origin: string;
  destination: string;
  distance: number;
  averageRate: number;
  rateRange: {
    min: number;
    max: number;
  };
  volatility: number;
  seasonality: SeasonalPattern[];
}

export interface SeasonalPattern {
  period: string;
  impact: number;
  confidence: number;
}

export interface MarketInsight {
  type: 'opportunity' | 'risk' | 'trend';
  lane: string;
  message: string;
  impact: number;
  action: string;
}