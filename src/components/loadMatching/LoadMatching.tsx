import React, { useState, useEffect } from 'react';
import { Load, LoadMatch } from '../../types';
import { mockLoads, mockDrivers } from '../../data/mockData';
import { findBestMatches } from '../../utils/matchingAlgorithm';
import { LoadCard } from '../LoadCard';

export function LoadMatching() {
  const [matches, setMatches] = useState<LoadMatch[]>([]);
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);

  useEffect(() => {
    const bestMatches = findBestMatches(mockLoads, mockDrivers);
    setMatches(bestMatches);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Load Matching</h2>
        <span className="text-sm text-gray-500">
          {matches.length} matches found
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLoads.map((load) => (
          <LoadCard
            key={load.id}
            load={load}
            onSelect={setSelectedLoad}
          />
        ))}
      </div>

      {selectedLoad && matches.find(m => m.loadId === selectedLoad.id) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Match Details
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Load ID: {selectedLoad.id}
              </p>
              <p className="text-sm text-gray-600">
                Match Score: {matches.find(m => m.loadId === selectedLoad.id)?.score}%
              </p>
              <button
                onClick={() => setSelectedLoad(null)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}