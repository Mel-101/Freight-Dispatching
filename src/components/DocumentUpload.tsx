import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Document, DocumentType } from '../types/documents';

interface DocumentUploadProps {
  onUpload: (document: Document) => void;
}

export function DocumentUpload({ onUpload }: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [documentType, setDocumentType] = useState<DocumentType>('bill_of_lading');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('idle');

    try {
      // In a real app, this would upload to a server
      const document: Document = {
        id: `DOC${Date.now()}`,
        type: documentType,
        title: file.name,
        dateCreated: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        status: 'pending',
        metadata: {
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          uploadedBy: 'current-user',
          tags: [],
          confidence: 0.95
        },
        content: {
          rawText: '',
          extractedData: {}
        }
      };

      onUpload(document);
      setUploadStatus('success');
    } catch (error) {
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upload Document</h3>
        {uploadStatus === 'success' && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Upload successful</span>
          </div>
        )}
        {uploadStatus === 'error' && (
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>Upload failed</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document Type
          </label>
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value as DocumentType)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="bill_of_lading">Bill of Lading</option>
            <option value="rate_confirmation">Rate Confirmation</option>
            <option value="contract">Contract</option>
            <option value="invoice">Invoice</option>
            <option value="proof_of_delivery">Proof of Delivery</option>
          </select>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="flex flex-col items-center">
            <FileText className="w-12 h-12 text-gray-400 mb-4" />
            <label className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-blue-600 hover:text-blue-500">
                {uploading ? 'Uploading...' : 'Select a file'}
              </span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
            <p className="mt-1 text-xs text-gray-500">
              PDF, Word, or Image files up to 10MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}