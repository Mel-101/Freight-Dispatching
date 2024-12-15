import { Document, DocumentType } from '../../types/documents';

const documentTemplates: Record<DocumentType, string[]> = {
  bill_of_lading: ['shipper', 'consignee', 'carrier', 'weight', 'pieces'],
  rate_confirmation: ['rate', 'pickup_date', 'delivery_date', 'terms'],
  contract: ['parties', 'terms', 'effective_date', 'expiration_date'],
  invoice: ['amount', 'due_date', 'payment_terms', 'services'],
  proof_of_delivery: ['delivery_date', 'receiver', 'condition', 'notes']
};

export function extractDocumentText(text: string, type: DocumentType): Record<string, string> {
  const template = documentTemplates[type];
  const extractedData: Record<string, string> = {};

  template.forEach(field => {
    // In a real implementation, use AI/ML for intelligent text extraction
    const pattern = new RegExp(`${field}[:\\s]+(.*?)(?=\\n|$)`, 'i');
    const match = text.match(pattern);
    if (match) {
      extractedData[field] = match[1].trim();
    }
  });

  return extractedData;
}