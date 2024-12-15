import React, { useState } from 'react';
import { Truck, Calendar, Map, FileText, MessageCircle, DollarSign, TrendingUp } from 'lucide-react';
import { LoadMatching } from './components/loadMatching/LoadMatching';
import { PredictiveScheduling } from './components/PredictiveScheduling';
import { RouteOptimization } from './components/RouteOptimization';
import { DocumentUpload } from './components/DocumentUpload';
import { ChatButton } from './components/chat/ChatButton';
import { TrackingDashboard } from './components/tracking/TrackingDashboard';
import { DriverPerformanceDashboard } from './components/performance/DriverPerformanceDashboard';
import { BillingDashboard } from './components/billing/BillingDashboard';
import { MarketTrendsDashboard } from './components/marketTrends/MarketTrendsDashboard';
import { NegotiationAssistant } from './components/rateNegotiation/NegotiationAssistant';

function App() {
  const [activeTab, setActiveTab] = useState('loads');

  const renderContent = () => {
    switch (activeTab) {
      case 'loads':
        return <LoadMatching />;
      case 'scheduling':
        return <PredictiveScheduling />;
      case 'tracking':
        return <TrackingDashboard loadId="L1" driverId="D1" />;
      case 'documents':
        return <DocumentUpload onUpload={console.log} />;
      case 'performance':
        return <DriverPerformanceDashboard driverId="D1" />;
      case 'billing':
        return <BillingDashboard />;
      case 'market':
        return <MarketTrendsDashboard />;
      case 'negotiate':
        return (
          <NegotiationAssistant
            lane="LA to Phoenix"
            loadType="Dry Van"
            weight={25000}
            pickupDate="2024-03-20"
            deliveryDate="2024-03-21"
            distance={373}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Truck className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  AI Dispatch
                </span>
              </div>
              <div className="ml-6 flex space-x-8">
                <button
                  onClick={() => setActiveTab('loads')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'loads'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Load Matching
                </button>
                <button
                  onClick={() => setActiveTab('scheduling')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'scheduling'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Scheduling
                </button>
                <button
                  onClick={() => setActiveTab('tracking')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'tracking'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Map className="w-4 h-4 mr-2" />
                  Tracking
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'documents'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Documents
                </button>
                <button
                  onClick={() => setActiveTab('performance')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'performance'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Performance
                </button>
                <button
                  onClick={() => setActiveTab('billing')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'billing'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Billing
                </button>
                <button
                  onClick={() => setActiveTab('market')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'market'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Market Trends
                </button>
                <button
                  onClick={() => setActiveTab('negotiate')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'negotiate'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Negotiate
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>

      <ChatButton userRole="dispatcher" />
    </div>
  );
}

export default App;