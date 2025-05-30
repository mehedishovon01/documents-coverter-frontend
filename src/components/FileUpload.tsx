import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes: string[];
  maxFiles?: number;
  title: string;
  description: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedFileTypes,
  maxFiles = 1,
  title,
  description,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles,
    multiple: false,
  });

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'
            }`}
        >
          <input {...getInputProps()} />
          <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <p className="mt-2 text-xs text-gray-500">
            {acceptedFileTypes.map((type) => type.toUpperCase()).join(', ')} files
            accepted
          </p>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <FiUpload className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <FiX className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload; 