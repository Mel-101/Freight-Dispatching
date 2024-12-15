import { PerformanceMetrics, PerformanceInsight } from '../../types/performance';

export function generateInsights(metrics: PerformanceMetrics): PerformanceInsight[] {
  const insights: PerformanceInsight[] = [];

  // Analyze speed metrics
  if (metrics.speed.speedingInstances > 0) {
    insights.push({
      type: 'warning',
      category: 'speed',
      metric: 'speedingInstances',
      message: `${metrics.speed.speedingInstances} speeding instances detected`,
      impact: -0.3,
      recommendation: 'Maintain consistent speed within limits to improve safety and fuel efficiency'
    });
  }

  // Analyze fuel metrics
  if (metrics.fuel.idleTime > 30) {
    insights.push({
      type: 'improvement',
      category: 'fuel',
      metric: 'idleTime',
      message: `Excessive idle time of ${metrics.fuel.idleTime} minutes`,
      impact: -0.2,
      recommendation: 'Reduce engine idle time to save fuel and reduce emissions'
    });
  }

  // Analyze safety metrics
  if (metrics.safety.safetyScore >= 90) {
    insights.push({
      type: 'achievement',
      category: 'safety',
      metric: 'safetyScore',
      message: 'Excellent safety performance maintained',
      impact: 0.5,
      recommendation: 'Continue maintaining safe driving practices'
    });
  }

  // Analyze efficiency metrics
  if (metrics.efficiency.onTimeDelivery > 95) {
    insights.push({
      type: 'achievement',
      category: 'efficiency',
      metric: 'onTimeDelivery',
      message: 'Outstanding on-time delivery performance',
      impact: 0.4,
      recommendation: 'Share best practices with other drivers'
    });
  }

  // Analyze compliance metrics
  if (metrics.compliance.hoursOfService.violations > 0) {
    insights.push({
      type: 'warning',
      category: 'compliance',
      metric: 'hoursOfService',
      message: 'Hours of Service violations detected',
      impact: -0.5,
      recommendation: 'Review and strictly follow HOS regulations'
    });
  }

  return insights;
}