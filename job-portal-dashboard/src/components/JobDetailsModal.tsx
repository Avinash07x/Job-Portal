import React from 'react';
import { X, MapPin, DollarSign, Clock } from 'lucide-react';
import type { Job } from '../types';

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onApply: (job: Job) => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  isOpen,
  onClose,
  job,
  onApply,
}) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative bg-white w-full max-w-3xl max-h-[100vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="relative h-52 sm:h-64">
          <img
            src={job.image}
            alt={job.title}
            className="w-full h-full object-cover"
          />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 hover:bg-white transition"
          >
            <X size={22} />
          </button>

          <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-2 shadow">
            <p className="text-xs text-gray-500">
              Posted on <span className="font-medium">{job.postedDate}</span>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {job.title}
            </h2>
            <p className="text-lg text-gray-600 mt-1">{job.company}</p>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm sm:text-base">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin size={18} />
              {job.location}
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <DollarSign size={18} />
              {job.salary}
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <Clock size={18} />
              {job.type}
            </div>
          </div>

          {/* Description */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Job Description
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 bg-white border-t p-4">
          <button
            onClick={() => onApply(job)}
            className="
              w-full py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-blue-600 to-purple-600
              hover:from-blue-700 hover:to-purple-700
              transition-all shadow-lg
            "
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
