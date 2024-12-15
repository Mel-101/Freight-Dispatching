import React, { useState, useEffect } from 'react';
import { AggregatedLoad, LoadSource, LoadFilter } from '../../types/loadBoard';
import { LoadBoardFilters } from './LoadBoardFilters';
import { AggregatedLoadCard } from './AggregatedLoadCard';
import { aggregateLoads } from '../../utils/loadBoard/loadAggregator';
import { mockLoads } from '../../data/mockData';

export function LoadBoardAggregator() {
  const [loads, setLoads] = useState<AggregatedLoad[]>([]);
  const [filters, setFilters] = useState<LoadFilter>({});
  const [selectedLoad, setSelectedLoad] = useState<AggregatedLoad | null>(null);

  // Mock sources for demo
  const sources: LoadSource[] = [
    { id: 'dat', name: 'DAT', type: 'dat', enabled: true },
    { id: 'ts', name: 'Truckstop', type: 'truckstop', enabled: true },
    { id: 'internal', name: 'Internal', type: 'internal', enabled: true }
  ];

  useEffect(() => {
    // In a real implementation, this would fetch from multiple load boards
    const aggregatedLoads = aggregateLoads(mockLoads, sources, filters);
    setLoads(aggregatedLoads);
  }, [filters]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Load Board</h2>
        <span className="text-sm text-gray-500">
          {loads.length} loads found
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <LoadBoardFilters
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>
        
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loads.map((load) => (
              <AggregatedLoadCard
                key={load.id}
                load={load}
                onSelect={setSelectedLoad}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedLoad && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Load Details
            </h3>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-auto">
              {JSON.stringify(selectedLoad, null, 2)}
            </pre>
            <button
              onClick={() => setSelectedLoad(null)}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}