export type DocumentType = 'bill_of_lading' | 'rate_confirmation' | 'contract' | 'invoice' | 'proof_of_delivery';

export interface Document {
  id: string;
  type: DocumentType;
  title: string;
  loadId?: string;
  driverId?: string;
  dateCreated: string;
  dateModified: string;
  status: 'pending' | 'processed' | 'verified' | 'archived';
  metadata: DocumentMetadata;
  content: DocumentContent;
}

export interface DocumentMetadata {
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
  tags: string[];
  confidence: number;
}

export interface DocumentContent {
  rawText: string;
  extractedData: {
    [key: string]: string | number | boolean;
  };
  signatures?: SignatureData[];
}

export interface SignatureData {
  name: string;
  position: string;
  dateSigned: string;
  verified: boolean;
}

export interface DocumentSearchParams {
  type?: DocumentType;
  loadId?: string;
  driverId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  status?: string;
  tags?: string[];
}