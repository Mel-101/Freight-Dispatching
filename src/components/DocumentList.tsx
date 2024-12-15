import React from 'react';
import { FileText, Search, Tag, Calendar, CheckCircle2 } from 'lucide-react';
import { Document } from '../types/documents';

interface DocumentListProps {
  documents: Document[];
  onSelect: (document: Document) => void;
}

export function DocumentList({ documents, onSelect }: DocumentListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="divide-y">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onSelect(doc)}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {doc.title}
                  </p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    doc.status === 'verified' ? 'bg-green-100 text-green-800' :
                    doc.status === 'processed' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>
                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(doc.dateModified).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    {doc.type.replace('_', ' ')}
                  </div>
                  {doc.metadata.confidence > 0.9 && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      High confidence
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}