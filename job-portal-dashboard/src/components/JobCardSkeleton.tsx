const JobCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-6 border animate-pulse">
      <div className="h-40 bg-gray-200 rounded mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-8 bg-gray-200 rounded" />
    </div>
  );
};

export default JobCardSkeleton;
