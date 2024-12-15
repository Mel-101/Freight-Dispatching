import { Load } from './index';

export interface Invoice {
  id: string;
  loadId: string;
  clientId: string;
  carrierId: string;
  amount: number;
  dueDate: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  lineItems: InvoiceLineItem[];
  metadata: InvoiceMetadata;
  paymentHistory: PaymentRecord[];
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  type: 'freight' | 'fuel_surcharge' | 'detention' | 'other';
}

export interface InvoiceMetadata {
  createdAt: string;
  updatedAt: string;
  aiProcessed: boolean;
  confidence: number;
  tags: string[];
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  method: 'ach' | 'wire' | 'check' | 'credit_card';
  status: 'pending' | 'completed' | 'failed';
  reference: string;
}

export interface PaymentReminder {
  id: string;
  invoiceId: string;
  type: 'upcoming' | 'due' | 'overdue';
  daysFromDue: number;
  sentAt: string;
  status: 'pending' | 'sent' | 'failed';
}

export interface BillingAnalytics {
  totalRevenue: number;
  outstandingAmount: number;
  averageDaysToPayment: number;
  overdueInvoices: number;
  paymentTrends: {
    period: string;
    amount: number;
    count: number;
  }[];
}