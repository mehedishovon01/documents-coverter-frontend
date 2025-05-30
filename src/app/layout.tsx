import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Document Converter',
  description: 'Convert your documents between PDF, Word, and Excel formats easily and securely.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header */}
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-gray-900">
              Document Converter
            </a>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/yourusername/converter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                GitHub
              </a>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        {children}

        {/* Footer */}
        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Document Converter. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
} 