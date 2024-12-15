import { Invoice, PaymentReminder } from '../../types/billing';

export function generateReminders(invoice: Invoice): PaymentReminder[] {
  const dueDate = new Date(invoice.dueDate);
  const today = new Date();
  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const reminders: PaymentReminder[] = [];

  if (daysUntilDue > 0) {
    // Upcoming payment reminder
    if (daysUntilDue <= 7) {
      reminders.push(createReminder(invoice.id, 'upcoming', daysUntilDue));
    }
  } else if (daysUntilDue === 0) {
    // Due today
    reminders.push(createReminder(invoice.id, 'due', 0));
  } else {
    // Overdue
    reminders.push(createReminder(invoice.id, 'overdue', Math.abs(daysUntilDue)));
  }

  return reminders;
}

function createReminder(
  invoiceId: string,
  type: PaymentReminder['type'],
  daysFromDue: number
): PaymentReminder {
  return {
    id: `REM${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    invoiceId,
    type,
    daysFromDue,
    sentAt: new Date().toISOString(),
    status: 'pending'
  };
}