import React from 'react';
import { MapPin, DollarSign, Clock } from 'lucide-react';
import type { Job } from '../types';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={job.image} 
          alt={job.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
        <p className="text-gray-600 mb-4">{job.company}</p>
        
        <div className="space-y-2 mb-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{job.type}</span>
          </div>
        </div>
        
        <button
          onClick={() => onViewDetails(job)}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};
export default JobCard;