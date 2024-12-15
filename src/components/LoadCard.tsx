import React from 'react';
import { Package, MapPin, Truck, DollarSign } from 'lucide-react';
import { Load } from '../types';

interface LoadCardProps {
  load: Load;
  onSelect?: (load: Load) => void;
}

export function LoadCard({ load, onSelect }: LoadCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{load.truckType}</h3>
          <span className={`inline-block px-2 py-1 text-sm rounded-full ${
            load.status === 'available' ? 'bg-green-100 text-green-800' :
            load.status === 'matched' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {load.status.charAt(0).toUpperCase() + load.status.slice(1)}
          </span>
        </div>
        <span className="flex items-center text-lg font-bold text-green-600">
          <DollarSign size={20} className="mr-1" />
          {load.rate.toLocaleString()}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-gray-500 mt-1 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">Pickup</p>
            <p className="text-sm text-gray-600">{load.pickupLocation}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-gray-500 mt-1 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-900">Delivery</p>
            <p className="text-sm text-gray-600">{load.deliveryLocation}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Package className="w-5 h-5 text-gray-500 mr-2" />
          <p className="text-sm text-gray-600">{load.weight.toLocaleString()} lbs</p>
        </div>
        
        <div className="flex items-center">
          <Truck className="w-5 h-5 text-gray-500 mr-2" />
          <p className="text-sm text-gray-600">{load.truckType}</p>
        </div>
      </div>
      
      {onSelect && (
        <button
          onClick={() => onSelect(load)}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      )}
    </div>
  );
}