import React, { useState, useEffect } from 'react';
import { DriverPerformance } from '../../types/performance';
import { PerformanceMetricCard } from './PerformanceMetricCard';
import { PerformanceInsightCard } from './PerformanceInsightCard';
import {
  calculateSpeedMetrics,
  calculateFuelMetrics,
  calculateSafetyMetrics,
  calculateEfficiencyMetrics,
  calculateComplianceMetrics,
  calculateOverallScore
} from '../../utils/performance/metricsCalculator';
import { generateInsights } from '../../utils/performance/insightGenerator';

interface DriverPerformanceDashboardProps {
  driverId: string;
  period?: { start: string; end: string };
}

export function DriverPerformanceDashboard({
  driverId,
  period = {
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    end: new Date().toISOString()
  }
}: DriverPerformanceDashboardProps) {
  const [performance, setPerformance] = useState<DriverPerformance | null>(null);

  useEffect(() => {
    // Memoize the period object to prevent infinite re-renders
    const currentPeriod = {
      start: period.start,
      end: period.end
    };

    // In a real implementation, this would fetch actual driver data
    const metrics = {
      speed: calculateSpeedMetrics({}),
      fuel: calculateFuelMetrics({}),
      safety: calculateSafetyMetrics({}),
      efficiency: calculateEfficiencyMetrics({}),
      compliance: calculateComplianceMetrics({})
    };

    const score = calculateOverallScore(metrics);
    const insights = generateInsights(metrics);

    const performanceData: DriverPerformance = {
      driverId,
      period: currentPeriod,
      metrics,
      insights,
      score
    };

    setPerformance(performanceData);
  }, [driverId, period.start, period.end]); // Only re-run when these values change

  if (!performance) {
    return <div>Loading performance data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Driver Performance</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Overall Score:</span>
            <span className={`text-2xl font-bold ${
              performance.score >= 90 ? 'text-green-600' :
              performance.score >= 70 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {performance.score}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <PerformanceMetricCard
            title="Safety Score"
            value={performance.metrics.safety.safetyScore}
            unit="%"
            target={100}
            trend={5}
            status={performance.metrics.safety.safetyScore >= 90 ? 'success' : 'warning'}
          />
          
          <PerformanceMetricCard
            title="Fuel Efficiency"
            value={performance.metrics.fuel.averageMpg}
            unit="MPG"
            target={7.5}
            trend={-2}
            status={performance.metrics.fuel.averageMpg >= 7 ? 'success' : 'warning'}
          />
          
          <PerformanceMetricCard
            title="On-Time Delivery"
            value={performance.metrics.efficiency.onTimeDelivery}
            unit="%"
            target={95}
            trend={3}
            status={performance.metrics.efficiency.onTimeDelivery >= 95 ? 'success' : 'warning'}
          />
          
          <PerformanceMetricCard
            title="HOS Compliance"
            value={performance.metrics.compliance.logAccuracy}
            unit="%"
            target={100}
            status={performance.metrics.compliance.hoursOfService.violations === 0 ? 'success' : 'danger'}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
        <div className="space-y-4">
          {performance.insights.map((insight, index) => (
            <PerformanceInsightCard key={index} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
}