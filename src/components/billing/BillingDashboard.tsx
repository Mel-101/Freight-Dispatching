import React, { useState, useEffect } from 'react';
import { Invoice } from '../../types/billing';
import { InvoiceList } from './InvoiceList';
import { InvoiceDetails } from './InvoiceDetails';
import { PaymentForm } from './PaymentForm';
import { generateInvoiceFromLoad } from '../../utils/billing/invoiceGenerator';
import { mockLoads } from '../../data/mockData';

export function BillingDashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    // Generate mock invoices from loads
    const generatedInvoices = mockLoads.map(load => generateInvoiceFromLoad(load));
    setInvoices(generatedInvoices);
  }, []);

  const handlePaymentSuccess = (payment: any) => {
    if (selectedInvoice) {
      const updatedInvoice = {
        ...selectedInvoice,
        status: 'paid',
        paymentHistory: [...selectedInvoice.paymentHistory, payment]
      };

      setInvoices(current =>
        current.map(inv =>
          inv.id === updatedInvoice.id ? updatedInvoice : inv
        )
      );

      setSelectedInvoice(updatedInvoice);
      setShowPaymentForm(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <InvoiceList
          invoices={invoices}
          onSelect={setSelectedInvoice}
        />
      </div>
      <div className="lg:col-span-2">
        {selectedInvoice ? (
          <InvoiceDetails
            invoice={selectedInvoice}
            onPayment={() => setShowPaymentForm(true)}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center text-gray-500">
            Select an invoice to view details
          </div>
        )}
      </div>

      {showPaymentForm && selectedInvoice && (
        <PaymentForm
          invoice={selectedInvoice}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowPaymentForm(false)}
        />
      )}
    </div>
  );
}