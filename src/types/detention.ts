export interface DetentionRecord {
  id: string;
  loadId: string;
  facilityId: string;
  facilityName: string;
  facilityType: 'pickup' | 'delivery';
  plannedArrival: string;
  actualArrival: string;
  plannedDeparture: string;
  actualDeparture: string;
  status: 'active' | 'completed' | 'billed';
  detentionTime: number; // minutes
  billableTime: number; // minutes after grace period
  rate: number; // per hour
  totalCost: number;
}

export interface FacilityPerformance {
  facilityId: string;
  name: string;
  address: string;
  averageDetention: number; // minutes
  historicalRecords: DetentionRecord[];
  riskScore: number; // 0-100
  commonDelayFactors: DelayFactor[];
  recommendations: string[];
}

export interface DelayFactor {
  type: 'staffing' | 'equipment' | 'paperwork' | 'capacity' | 'weather' | 'other';
  frequency: number; // 0-1
  averageImpact: number; // minutes
  description: string;
}

export interface DetentionAlert {
  id: string;
  loadId: string;
  facilityId: string;
  type: 'approaching_threshold' | 'exceeded_threshold' | 'high_risk_facility';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  recommendedAction: string;
}