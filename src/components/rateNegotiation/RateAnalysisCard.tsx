import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { RateRecommendation, NegotiationFactor } from '../../types/rateNegotiation';

interface RateAnalysisCardProps {
  recommendation: RateRecommendation;
}

export function RateAnalysisCard({ recommendation }: RateAnalysisCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Rate Analysis</h3>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Confidence:</span>
          <span className="font-medium text-blue-600">
            {Math.round(recommendation.confidence * 100)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Suggested Rate</p>
          <p className="text-2xl font-bold text-blue-600">
            ${recommendation.suggestedRate.toLocaleString()}
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Target Range</p>
          <p className="text-lg font-medium text-gray-900">
            ${recommendation.minAcceptableRate.toLocaleString()} - 
            ${recommendation.maxRate.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Contributing Factors</h4>
        {recommendation.factors.map((factor, index) => (
          <div key={index} className="flex items-start space-x-3">
            {factor.impact > 0 ? (
              <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500 mt-1" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">
                  {factor.type.charAt(0).toUpperCase() + factor.type.slice(1)}
                </p>
                <span className={`text-sm font-medium ${
                  factor.impact > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {factor.impact > 0 ? '+' : ''}{Math.round(factor.impact * 100)}%
                </span>
              </div>
              <p className="text-sm text-gray-600">{factor.description}</p>
              {factor.dataPoints && (
                <div className="mt-1 space-y-1">
                  {factor.dataPoints.map((point, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{point.label}</span>
                      <span className="font-medium">${point.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <h4 className="font-medium text-gray-900 mb-3">Negotiation Strategy</h4>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Initial Offer</p>
            <p className="text-lg font-bold text-blue-600">
              ${recommendation.strategy.initialOffer.toLocaleString()}
            </p>
          </div>
          
          <div className="space-y-2">
            {recommendation.strategy.talkingPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                <p className="text-sm text-gray-600">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}