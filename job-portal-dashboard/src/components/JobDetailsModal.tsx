import React from 'react';
import { X, MapPin, DollarSign, Clock } from 'lucide-react';
import type { Job } from '../types';

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onApply: (job: Job) => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ isOpen, onClose, job, onApply }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[100vh] overflow-y-auto">
        <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-lg">
          <img 
            src={job.image} 
            alt={job.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 text-gray-600 hover:text-gray-900 transition-colors shadow-lg"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 sm:p-6 space-y-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{job.title}</h2>
            <p className="text-xl text-gray-600 mt-1">{job.company}</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin size={18} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <DollarSign size={18} />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock size={18} />
              <span>{job.type}</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            Posted: {job.postedDate}
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Job Description</h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>
          
          <button 
            onClick={() => onApply(job)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;