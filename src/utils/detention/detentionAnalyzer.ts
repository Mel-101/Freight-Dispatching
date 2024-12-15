import {
  DetentionRecord,
  FacilityPerformance,
  DelayFactor,
  DetentionAlert
} from '../../types/detention';

export function analyzeFacilityPerformance(
  records: DetentionRecord[]
): FacilityPerformance[] {
  const facilitiesMap = new Map<string, DetentionRecord[]>();
  
  // Group records by facility
  records.forEach(record => {
    const existing = facilitiesMap.get(record.facilityId) || [];
    facilitiesMap.set(record.facilityId, [...existing, record]);
  });

  return Array.from(facilitiesMap.entries()).map(([facilityId, records]) => {
    const averageDetention = calculateAverageDetention(records);
    const delayFactors = analyzeDelayFactors(records);
    const riskScore = calculateRiskScore(averageDetention, delayFactors);

    return {
      facilityId,
      name: records[0].facilityName,
      address: 'Sample Address', // In real app, get from facility database
      averageDetention,
      historicalRecords: records,
      riskScore,
      commonDelayFactors: delayFactors,
      recommendations: generateRecommendations(delayFactors, averageDetention)
    };
  });
}

function calculateAverageDetention(records: DetentionRecord[]): number {
  return records.reduce((sum, record) => sum + record.detentionTime, 0) / records.length;
}

function analyzeDelayFactors(records: DetentionRecord[]): DelayFactor[] {
  // In a real implementation, use ML to identify patterns
  return [
    {
      type: 'staffing',
      frequency: 0.3,
      averageImpact: 45,
      description: 'Limited dock staff during peak hours'
    },
    {
      type: 'equipment',
      frequency: 0.2,
      averageImpact: 30,
      description: 'Forklift availability issues'
    }
  ];
}

function calculateRiskScore(averageDetention: number, factors: DelayFactor[]): number {
  const detentionScore = Math.min(100, (averageDetention / 120) * 100);
  const factorScore = factors.reduce((score, factor) => 
    score + (factor.frequency * factor.averageImpact), 0) / factors.length;
  
  return Math.round((detentionScore + (factorScore / 2)) / 2);
}

function generateRecommendations(
  factors: DelayFactor[],
  averageDetention: number
): string[] {
  const recommendations: string[] = [];

  if (averageDetention > 60) {
    recommendations.push('Schedule deliveries during off-peak hours');
  }

  factors.forEach(factor => {
    if (factor.frequency > 0.3) {
      switch (factor.type) {
        case 'staffing':
          recommendations.push('Request dedicated unload staff for deliveries');
          break;
        case 'equipment':
          recommendations.push('Confirm equipment availability before arrival');
          break;
      }
    }
  });

  return recommendations;
}

export function generateDetentionAlerts(
  currentDetention: DetentionRecord,
  facilityPerformance: FacilityPerformance
): DetentionAlert[] {
  const alerts: DetentionAlert[] = [];
  const timestamp = new Date().toISOString();

  // Check for approaching threshold
  if (currentDetention.detentionTime >= 60 && currentDetention.detentionTime < 120) {
    alerts.push({
      id: `ALERT-${Date.now()}`,
      loadId: currentDetention.loadId,
      facilityId: currentDetention.facilityId,
      type: 'approaching_threshold',
      severity: 'medium',
      message: 'Approaching billable detention time',
      timestamp,
      recommendedAction: 'Contact facility manager to expedite unloading'
    });
  }

  // Check for exceeded threshold
  if (currentDetention.detentionTime >= 120) {
    alerts.push({
      id: `ALERT-${Date.now()}-2`,
      loadId: currentDetention.loadId,
      facilityId: currentDetention.facilityId,
      type: 'exceeded_threshold',
      severity: 'high',
      message: 'Detention time has exceeded billable threshold',
      timestamp,
      recommendedAction: 'Document delay reasons and initiate detention billing process'
    });
  }

  // Check for high-risk facility
  if (facilityPerformance.riskScore >= 75) {
    alerts.push({
      id: `ALERT-${Date.now()}-3`,
      loadId: currentDetention.loadId,
      facilityId: currentDetention.facilityId,
      type: 'high_risk_facility',
      severity: 'high',
      message: 'High-risk facility based on historical performance',
      timestamp,
      recommendedAction: 'Consider scheduling during off-peak hours or requesting expedited service'
    });
  }

  return alerts;
}