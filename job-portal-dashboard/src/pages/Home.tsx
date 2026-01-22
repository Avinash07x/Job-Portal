import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Types
import type { Job, ApplicationForm } from '../types';

// API & Hooks
import { fetchJobs } from '../api/jobService';
import { useDebounce } from '../hooks/useDebounce';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// Components
import  Hero from '../components/Hero';
import  Stats  from '../components/Stats';
import  About  from '../components/About';
import  JobCardSkeleton  from '../components/JobCardSkeleton';
import  JobCard  from '../components/JobCard';
import  JobTable  from '../components/JobTable';
import  JobDetailsModal  from '../components/JobDetailsModal';
import  ApplicationFormModal  from '../components/ApplicationFormModal';
import  SuccessModal  from '../components/SuccessModal';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [appliedJobTitle, setAppliedJobTitle] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const loadJobs = useCallback(
    async (searchQuery: string, pageNum: number, append = false) => {
      setLoading(true);
      try {
        const data = await fetchJobs(searchQuery, pageNum);
        setJobs(prev => (append ? [...prev, ...data.jobs] : data.jobs));
        setTotal(data.total);
        setHasMore(data.jobs.length === 10);
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Load jobs on search change
  useEffect(() => {
    setPage(1);
    loadJobs(debouncedSearch, 1, false);
  }, [debouncedSearch, loadJobs]);

  // Infinite scrolling for grid view
  const [setNode, entries] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (entries[0]?.isIntersecting && !loading && hasMore && viewMode === 'grid') {
      const nextPage = page + 1;
      setPage(nextPage);
      loadJobs(debouncedSearch, nextPage, true);
    }
  }, [entries, loading, hasMore, page, debouncedSearch, loadJobs, viewMode]);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApplyNow = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(false);
    setIsApplicationFormOpen(true);
  };

  const handleApplicationSubmit = (data: ApplicationForm) => {
    setApplicantName(data.name);
    setAppliedJobTitle(data.jobTitle);
    setIsApplicationFormOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
    setApplicantName('');
    setAppliedJobTitle('');
    setSelectedJob(null);
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="bg-gray-50">
      <Hero searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <Stats />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Latest Job Openings</h2>
            <p className="text-gray-600 mt-2">Explore the newest opportunities from top companies</p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Table
            </button>
          </div>
        </div>

        {/* Jobs Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} onViewDetails={handleViewDetails} />
            ))}

            {loading &&
              Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}

            {!loading && hasMore && <div ref={setNode} className="col-span-full h-10" />}
          </div>
        ) : (
          <>
            <JobTable jobs={jobs} onViewDetails={handleViewDetails} />

            {/* Pagination for Table View */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
              <p className="text-sm text-gray-700">
                Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total} results
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const prevPage = Math.max(1, page - 1);
                    setPage(prevPage);
                    loadJobs(debouncedSearch, prevPage, false);
                  }}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                <button
                  onClick={() => {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    loadJobs(debouncedSearch, nextPage, false);
                  }}
                  disabled={page >= totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}

        {!loading && jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found matching your search.</p>
          </div>
        )}
      </div>

      <About />

      <JobDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
        onApply={handleApplyNow}
      />

      <ApplicationFormModal
        isOpen={isApplicationFormOpen}
        onClose={() => setIsApplicationFormOpen(false)}
        job={selectedJob}
        onSubmit={handleApplicationSubmit}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessClose}
        name={applicantName}
        jobTitle={appliedJobTitle}
      />
    </div>
  );
};

export default Home;
