import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { DetentionRecord, FacilityPerformance, DetentionAlert } from '../../types/detention';
import { analyzeFacilityPerformance, generateDetentionAlerts } from '../../utils/detention/detentionAnalyzer';

interface DetentionTrackerProps {
  loadId: string;
  facilityId: string;
}

export function DetentionTracker({ loadId, facilityId }: DetentionTrackerProps) {
  const [currentDetention, setCurrentDetention] = useState<DetentionRecord | null>(null);
  const [facilityPerformance, setFacilityPerformance] = useState<FacilityPerformance | null>(null);
  const [alerts, setAlerts] = useState<DetentionAlert[]>([]);

  useEffect(() => {
    // In a real implementation, fetch actual detention data
    const mockDetention: DetentionRecord = {
      id: `DET-${Date.now()}`,
      loadId,
      facilityId,
      facilityName: 'Sample Facility',
      facilityType: 'delivery',
      plannedArrival: new Date(Date.now() - 120 * 60000).toISOString(),
      actualArrival: new Date(Date.now() - 90 * 60000).toISOString(),
      plannedDeparture: new Date(Date.now()).toISOString(),
      actualDeparture: '',
      status: 'active',
      detentionTime: 90,
      billableTime: 0,
      rate: 75,
      totalCost: 0
    };

    const mockHistoricalRecords: DetentionRecord[] = [mockDetention];
    const [facilityAnalysis] = analyzeFacilityPerformance(mockHistoricalRecords);
    
    setCurrentDetention(mockDetention);
    setFacilityPerformance(facilityAnalysis);
    
    // Update alerts
    if (mockDetention && facilityAnalysis) {
      const newAlerts = generateDetentionAlerts(mockDetention, facilityAnalysis);
      setAlerts(newAlerts);
    }
  }, [loadId, facilityId]);

  if (!currentDetention || !facilityPerformance) {
    return <div>Loading detention data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Detention Tracking
          </h3>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-900">
              {currentDetention.detentionTime} minutes
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Facility Risk Score</p>
            <div className="flex items-center mt-1">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                facilityPerformance.riskScore >= 75 ? 'bg-red-500' :
                facilityPerformance.riskScore >= 50 ? 'bg-yellow-500' :
                'bg-green-500'
              }`} />
              <span className="text-xl font-bold text-gray-900">
                {facilityPerformance.riskScore}
              </span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Average Detention</p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {Math.round(facilityPerformance.averageDetention)} min
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Potential Cost</p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              ${Math.max(0, Math.floor((currentDetention.detentionTime - 120) / 60) * currentDetention.rate)}
            </p>
          </div>
        </div>

        {alerts.length > 0 && (
          <div className="space-y-3">
            {alerts.map(alert => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg flex items-start space-x-3 ${
                  alert.severity === 'high' ? 'bg-red-50' :
                  alert.severity === 'medium' ? 'bg-yellow-50' :
                  'bg-blue-50'
                }`}
              >
                <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                  alert.severity === 'high' ? 'text-red-500' :
                  alert.severity === 'medium' ? 'text-yellow-500' :
                  'text-blue-500'
                }`} />
                <div>
                  <p className="font-medium text-gray-900">{alert.message}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {alert.recommendedAction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Facility Analysis</h4>
        <div className="space-y-4">
          {facilityPerformance.commonDelayFactors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {factor.type.charAt(0).toUpperCase() + factor.type.slice(1)}
                </p>
                <p className="text-sm text-gray-600">{factor.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {Math.round(factor.frequency * 100)}% frequency
                </p>
                <p className="text-sm text-gray-600">
                  ~{factor.averageImpact} min impact
                </p>
              </div>
            </div>
          ))}
        </div>

        {facilityPerformance.recommendations.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
            <ul className="space-y-2">
              {facilityPerformance.recommendations.map((rec, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}