import React from 'react';

const JobCardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
    <div className="h-10 bg-gray-200 rounded"></div>
  </div>
);

export default JobCardSkeleton;