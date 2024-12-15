import React from 'react';
import { FileText, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import { Invoice } from '../../types/billing';

interface InvoiceListProps {
  invoices: Invoice[];
  onSelect: (invoice: Invoice) => void;
}

export function InvoiceList({ invoices, onSelect }: InvoiceListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Invoices</h3>
      </div>

      <div className="divide-y">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            onClick={() => onSelect(invoice)}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {invoice.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Load: {invoice.loadId}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ${invoice.amount.toLocaleString()}
                </p>
                <p className={`text-sm ${
                  invoice.status === 'paid' ? 'text-green-600' :
                  invoice.status === 'overdue' ? 'text-red-600' :
                  'text-gray-500'
                }`}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </p>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                Due: {new Date(invoice.dueDate).toLocaleDateString()}
              </div>
              {invoice.status === 'overdue' && (
                <div className="flex items-center text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Payment Overdue
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}