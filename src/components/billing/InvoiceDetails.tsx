import React from 'react';
import { DollarSign, Calendar, CreditCard, CheckCircle } from 'lucide-react';
import { Invoice } from '../../types/billing';

interface InvoiceDetailsProps {
  invoice: Invoice;
  onPayment: () => void;
}

export function InvoiceDetails({ invoice, onPayment }: InvoiceDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Invoice {invoice.id}
          </h3>
          <p className="text-sm text-gray-500">Load: {invoice.loadId}</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
          invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </span>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Line Items</h4>
          <div className="space-y-3">
            {invoice.lineItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{item.description}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x ${item.rate.toLocaleString()}
                  </p>
                </div>
                <p className="font-medium text-gray-900">
                  ${item.amount.toLocaleString()}
                </p>
              </div>
            ))}
            <div className="pt-3 border-t flex items-center justify-between font-bold">
              <p>Total</p>
              <p>${invoice.amount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Payment History</h4>
          {invoice.paymentHistory.length > 0 ? (
            <div className="space-y-3">
              {invoice.paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {payment.method.toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(payment.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${payment.amount.toLocaleString()}
                    </p>
                    <p className={`text-sm ${
                      payment.status === 'completed' ? 'text-green-600' :
                      payment.status === 'failed' ? 'text-red-600' :
                      'text-gray-500'
                    }`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No payments recorded</p>
          )}
        </div>

        {invoice.status !== 'paid' && (
          <button
            onClick={onPayment}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 
                     transition-colors flex items-center justify-center"
          >
            <DollarSign className="w-5 h-5 mr-2" />
            Make Payment
          </button>
        )}
      </div>
    </div>
  );
}