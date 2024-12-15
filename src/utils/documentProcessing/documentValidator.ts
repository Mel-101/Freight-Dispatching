import { Document, DocumentType } from '../../types/documents';

interface ValidationRule {
  field: string;
  required: boolean;
  validator?: (value: any) => boolean;
  message: string;
}

const validationRules: Record<DocumentType, ValidationRule[]> = {
  bill_of_lading: [
    { field: 'shipper', required: true, message: 'Shipper information is required' },
    { field: 'consignee', required: true, message: 'Consignee information is required' },
    { field: 'weight', required: true, message: 'Weight must be specified' }
  ],
  rate_confirmation: [
    { field: 'rate', required: true, message: 'Rate must be specified' },
    { field: 'pickup_date', required: true, message: 'Pickup date is required' },
    { field: 'delivery_date', required: true, message: 'Delivery date is required' }
  ],
  contract: [
    { field: 'parties', required: true, message: 'Contract parties must be specified' },
    { field: 'effective_date', required: true, message: 'Effective date is required' }
  ],
  invoice: [
    { field: 'amount', required: true, message: 'Invoice amount is required' },
    { field: 'due_date', required: true, message: 'Due date is required' }
  ],
  proof_of_delivery: [
    { field: 'delivery_date', required: true, message: 'Delivery date is required' },
    { field: 'receiver', required: true, message: 'Receiver information is required' }
  ]
};

export function validateDocument(document: Document): { valid: boolean; errors: string[] } {
  const rules = validationRules[document.type];
  const errors: string[] = [];

  rules.forEach(rule => {
    const value = document.content.extractedData[rule.field];
    if (rule.required && !value) {
      errors.push(rule.message);
    }
    if (value && rule.validator && !rule.validator(value)) {
      errors.push(rule.message);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}