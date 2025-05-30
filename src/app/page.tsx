'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiFileText, FiFile, FiGrid } from 'react-icons/fi';
import ConversionCard from '@/components/ConversionCard';

const conversionOptions = [
  {
    title: 'PDF to Word',
    description: 'Convert PDF documents to editable Word files',
    icon: FiFileText,
    fromFormat: 'pdf',
    toFormat: 'docx',
    path: '/convert/pdf-to-word',
  },
  {
    title: 'PDF to Excel',
    description: 'Convert PDF tables to Excel spreadsheets',
    icon: FiGrid,
    fromFormat: 'pdf',
    toFormat: 'xlsx',
    path: '/convert/pdf-to-excel',
  },
  {
    title: 'Word to PDF',
    description: 'Convert Word documents to PDF format',
    icon: FiFile,
    fromFormat: 'docx',
    toFormat: 'pdf',
    path: '/convert/word-to-pdf',
  },
  {
    title: 'Word to Excel',
    description: 'Convert Word documents to Excel format',
    icon: FiGrid,
    fromFormat: 'docx',
    toFormat: 'xlsx',
    path: '/convert/word-to-excel',
  },
  {
    title: 'Excel to PDF',
    description: 'Convert Excel spreadsheets to PDF format',
    icon: FiFile,
    fromFormat: 'xlsx',
    toFormat: 'pdf',
    path: '/convert/excel-to-pdf',
  },
  {
    title: 'Excel to Word',
    description: 'Convert Excel spreadsheets to Word format',
    icon: FiFileText,
    fromFormat: 'xlsx',
    toFormat: 'docx',
    path: '/convert/excel-to-word',
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Document Converter
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Convert your documents between PDF, Word, and Excel formats easily
              and securely.
            </p>
          </div>
        </div>
      </div>

      {/* Conversion Options */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {conversionOptions.map((option) => (
            <ConversionCard
              key={option.path}
              title={option.title}
              description={option.description}
              icon={option.icon}
              fromFormat={option.fromFormat}
              toFormat={option.toFormat}
              onClick={() => router.push(option.path)}
            />
          ))}
        </div>
      </div>
    </main>
  );
} 