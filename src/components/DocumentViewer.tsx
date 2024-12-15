import React from 'react';
import { Document } from '../types/documents';
import { FileText, Calendar, User, Tag, CheckCircle, AlertCircle } from 'lucide-react';

interface DocumentViewerProps {
  document: Document;
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{document.title}</h3>
          <p className="text-sm text-gray-500">
            {document.type.replace('_', ' ').charAt(0).toUpperCase() + 
             document.type.slice(1).replace('_', ' ')}
          </p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          document.status === 'verified' ? 'bg-green-100 text-green-800' :
          document.status === 'processed' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {document.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            Created: {new Date(document.dateCreated).toLocaleDateString()}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2" />
            Uploaded by: {document.metadata.uploadedBy}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <FileText className="w-4 h-4 mr-2" />
            Size: {(document.metadata.fileSize / 1024).toFixed(2)} KB
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Tag className="w-4 h-4 mr-2" />
            Tags: {document.metadata.tags.join(', ') || 'No tags'}
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4 mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Extracted Data</h4>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(document.content.extractedData).map(([key, value]) => (
            <div key={key} className="flex items-start space-x-2">
              <div className="w-4 mt-1">
                {document.metadata.confidence > 0.9 ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {key.replace('_', ' ').charAt(0).toUpperCase() + 
                   key.slice(1).replace('_', ' ')}
                </p>
                <p className="text-sm text-gray-600">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {document.content.signatures && (
        <div className="border rounded-lg p-4">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Signatures</h4>
          <div className="space-y-4">
            {document.content.signatures.map((signature, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{signature.name}</p>
                  <p className="text-sm text-gray-600">{signature.position}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">
                    {new Date(signature.dateSigned).toLocaleDateString()}
                  </span>
                  {signature.verified ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}