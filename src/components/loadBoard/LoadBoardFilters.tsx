import React from 'react';
import { Filter, DollarSign, Tag } from 'lucide-react';
import { LoadFilter } from '../../types/loadBoard';

interface LoadBoardFiltersProps {
  filters: LoadFilter;
  onFilterChange: (filters: LoadFilter) => void;
}

export function LoadBoardFilters({ filters, onFilterChange }: LoadBoardFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-gray-500" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Origin Locations
          </label>
          <input
            type="text"
            placeholder="Enter locations..."
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => onFilterChange({
              ...filters,
              origins: e.target.value ? e.target.value.split(',') : undefined
            })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination Locations
          </label>
          <input
            type="text"
            placeholder="Enter locations..."
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => onFilterChange({
              ...filters,
              destinations: e.target.value ? e.target.value.split(',') : undefined
            })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Equipment Types
          </label>
          <select
            multiple
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => onFilterChange({
              ...filters,
              truckTypes: Array.from(e.target.selectedOptions, option => option.value)
            })}
          >
            <option value="Dry Van">Dry Van</option>
            <option value="Reefer">Reefer</option>
            <option value="Flatbed">Flatbed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Rate
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              className="w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => onFilterChange({
                ...filters,
                minRate: Number(e.target.value)
              })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {['high-profit', 'perfect-fit', 'premium-rate'].map(tag => (
              <button
                key={tag}
                onClick={() => onFilterChange({
                  ...filters,
                  tags: filters.tags?.includes(tag)
                    ? filters.tags.filter(t => t !== tag)
                    : [...(filters.tags || []), tag]
                })}
                className={`flex items-center px-3 py-1 rounded-full text-sm ${
                  filters.tags?.includes(tag)
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <Tag className="w-4 h-4 mr-1" />
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}