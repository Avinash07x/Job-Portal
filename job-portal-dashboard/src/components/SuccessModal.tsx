import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  jobTitle: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, name, jobTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          🎉 Congratulations {name}! 🎉
        </h2>
        
        <p className="text-lg text-gray-600 mb-6">
          Your application for <span className="font-semibold text-blue-600">{jobTitle}</span> has been successfully submitted!
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            Our recruitment team will review your application and get back to you within 3-5 business days.
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
        >
          Continue Browsing Jobs
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;