import React, { useState } from 'react';
import { CreditCard, DollarSign } from 'lucide-react';
import { Invoice, PaymentRecord } from '../../types/billing';
import { processPayment } from '../../utils/billing/paymentProcessor';

interface PaymentFormProps {
  invoice: Invoice;
  onSuccess: (payment: PaymentRecord) => void;
  onCancel: () => void;
}

export function PaymentForm({ invoice, onSuccess, onCancel }: PaymentFormProps) {
  const [method, setMethod] = useState<PaymentRecord['method']>('ach');
  const [amount, setAmount] = useState(invoice.amount);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const payment = await processPayment(invoice, amount, method);
      onSuccess(payment);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Make Payment
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as PaymentRecord['method'])}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ach">ACH Transfer</option>
              <option value="wire">Wire Transfer</option>
              <option value="credit_card">Credit Card</option>
              <option value="check">Check</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                max={invoice.amount}
                step="0.01"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              disabled={processing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                       transition-colors flex items-center disabled:opacity-50"
              disabled={processing}
            >
              {processing ? (
                'Processing...'
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Now
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}