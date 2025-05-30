import React from 'react';
import { IconType } from 'react-icons';
import { FiArrowRight } from 'react-icons/fi';

interface ConversionCardProps {
  title: string;
  description: string;
  icon: IconType;
  fromFormat: string;
  toFormat: string;
  onClick: () => void;
}

const ConversionCard: React.FC<ConversionCardProps> = ({
  title,
  description,
  icon: Icon,
  fromFormat,
  toFormat,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-left"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span className="font-medium">{fromFormat.toUpperCase()}</span>
            <FiArrowRight className="mx-2 h-4 w-4" />
            <span className="font-medium">{toFormat.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ConversionCard; 