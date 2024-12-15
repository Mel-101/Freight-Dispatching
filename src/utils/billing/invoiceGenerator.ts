import { Load } from '../../types';
import { Invoice, InvoiceLineItem } from '../../types/billing';

export function generateInvoiceFromLoad(load: Load): Invoice {
  const baseRate = load.rate;
  const fuelSurcharge = calculateFuelSurcharge(load);
  const detentionCharges = calculateDetentionCharges(load);

  const lineItems: InvoiceLineItem[] = [
    {
      description: 'Freight Charges',
      quantity: 1,
      rate: baseRate,
      amount: baseRate,
      type: 'freight'
    },
    {
      description: 'Fuel Surcharge',
      quantity: 1,
      rate: fuelSurcharge,
      amount: fuelSurcharge,
      type: 'fuel_surcharge'
    }
  ];

  if (detentionCharges > 0) {
    lineItems.push({
      description: 'Detention Charges',
      quantity: 1,
      rate: detentionCharges,
      amount: detentionCharges,
      type: 'detention'
    });
  }

  const totalAmount = lineItems.reduce((sum, item) => sum + item.amount, 0);

  return {
    id: `INV${Date.now()}`,
    loadId: load.id,
    clientId: 'CLIENT123', // In real app, get from load data
    carrierId: 'CARRIER123', // In real app, get from load data
    amount: totalAmount,
    dueDate: calculateDueDate(new Date(), 30), // 30-day payment terms
    status: 'draft',
    lineItems,
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      aiProcessed: true,
      confidence: 0.95,
      tags: []
    },
    paymentHistory: []
  };
}

function calculateFuelSurcharge(load: Load): number {
  // In real app, use current fuel prices and distance
  return Math.round(load.rate * 0.1); // 10% fuel surcharge
}

function calculateDetentionCharges(load: Load): number {
  // In real app, calculate based on actual detention time
  return 0;
}

function calculateDueDate(date: Date, termDays: number): string {
  const dueDate = new Date(date);
  dueDate.setDate(dueDate.getDate() + termDays);
  return dueDate.toISOString();
}