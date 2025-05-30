'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';
import FileUpload from '@/components/FileUpload';
import LoadingSpinner from '@/components/LoadingSpinner';

const conversionTypes = {
  'pdf-to-word': {
    title: 'PDF to Word',
    description: 'Convert your PDF to an editable Word document',
    acceptedTypes: ['.pdf'],
    apiEndpoint: '/api/v1/pdf/to-word',
  },
  'pdf-to-excel': {
    title: 'PDF to Excel',
    description: 'Convert your PDF to an Excel spreadsheet',
    acceptedTypes: ['.pdf'],
    apiEndpoint: '/api/v1/pdf/to-excel',
  },
  'word-to-pdf': {
    title: 'Word to PDF',
    description: 'Convert your Word document to PDF',
    acceptedTypes: ['.docx', '.doc'],
    apiEndpoint: '/api/v1/word/to-pdf',
  },
  'word-to-excel': {
    title: 'Word to Excel',
    description: 'Convert your Word document to Excel',
    acceptedTypes: ['.docx', '.doc'],
    apiEndpoint: '/api/v1/word/to-excel',
  },
  'excel-to-pdf': {
    title: 'Excel to PDF',
    description: 'Convert your Excel spreadsheet to PDF',
    acceptedTypes: ['.xlsx', '.xls'],
    apiEndpoint: '/api/v1/excel/to-pdf',
  },
  'excel-to-word': {
    title: 'Excel to Word',
    description: 'Convert your Excel spreadsheet to Word',
    acceptedTypes: ['.xlsx', '.xls'],
    apiEndpoint: '/api/v1/excel/to-word',
  },
};

export default function ConversionPage({
  params,
}: {
  params: { type: string };
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const conversionType = conversionTypes[params.type as keyof typeof conversionTypes];

  if (!conversionType) {
    router.push('/');
    return null;
  }

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    setDownloadUrl(null);
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsConverting(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${conversionType.apiEndpoint}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Conversion failed. Please try again.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </button>

        {/* Conversion Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {conversionType.title}
          </h1>
          <p className="text-gray-600 mb-8">{conversionType.description}</p>

          {/* File Upload */}
          <FileUpload
            onFileSelect={handleFileSelect}
            acceptedFileTypes={conversionType.acceptedTypes}
            title="Select your file"
            description="or drag and drop it here"
          />

          {/* Convert Button */}
          {file && !isConverting && !downloadUrl && (
            <button
              onClick={handleConvert}
              className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Convert Now
            </button>
          )}

          {/* Loading State */}
          {isConverting && <LoadingSpinner />}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {/* Download Button */}
          {downloadUrl && (
            <a
              href={downloadUrl}
              download
              className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
            >
              <FiDownload className="mr-2" />
              Download Converted File
            </a>
          )}
        </div>
      </div>
    </main>
  );
} 