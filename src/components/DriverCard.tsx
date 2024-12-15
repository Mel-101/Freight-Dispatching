import React from 'react';
import { User, Truck, MapPin, Check } from 'lucide-react';
import { Driver } from '../types';

interface DriverCardProps {
  driver: Driver;
}

export function DriverCard({ driver }: DriverCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
            driver.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {driver.availability ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                Available
              </>
            ) : 'Unavailable'}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <MapPin className="w-5 h-5 text-gray-500 mr-2" />
          <p className="text-sm text-gray-600">{driver.location}</p>
        </div>
        
        <div className="flex items-center">
          <Truck className="w-5 h-5 text-gray-500 mr-2" />
          <p className="text-sm text-gray-600">{driver.truckType}</p>
        </div>
      </div>
    </div>
  );
}