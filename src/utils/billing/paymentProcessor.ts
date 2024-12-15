import { Invoice, PaymentRecord } from '../../types/billing';

export async function processPayment(
  invoice: Invoice,
  amount: number,
  method: PaymentRecord['method']
): Promise<PaymentRecord> {
  // In real app, integrate with payment gateway
  const payment: PaymentRecord = {
    id: `PAY${Date.now()}`,
    amount,
    date: new Date().toISOString(),
    method,
    status: 'pending',
    reference: generateReference()
  };

  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    payment.status = 'completed';
    return payment;
  } catch (error) {
    payment.status = 'failed';
    throw error;
  }
}

function generateReference(): string {
  return `REF${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
}