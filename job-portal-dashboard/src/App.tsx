import React, { useState, useEffect, useCallback } from 'react';
import { Search, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

import type { Job, ApplicationForm } from '../types';

import { fetchJobs } from './api/jobService';
import useDebounce from './hooks/useDebounce';
import useIntersectionObserver from './hooks/useIntersectionObserver';

import ErrorBoundary from './components/ErrorBoundary';
import JobCardSkeleton from './components/JobCardSkeleton';
import JobCard from './components/JobCard';
import JobTable from './components/JobTable';
import JobDetailsModal from './components/JobDetailsModal';
import ApplicationFormModal from './components/ApplicationFormModal';
import SuccessModal from './components/SuccessModal';

const PAGE_SIZE = 10;

const JobPortalDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [applicantName, setApplicantName] = useState('');
  const [appliedJobTitle, setAppliedJobTitle] = useState('');

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearch = useDebounce(searchTerm, 500);

  // 🔹 Load Jobs
  const loadJobs = useCallback(
    async (search: string, pageNum: number, append = false) => {
      setLoading(true);
      try {
        const res = await fetchJobs(search, pageNum);
        setJobs(prev => (append ? [...prev, ...res.jobs] : res.jobs));
        setTotal(res.total);
        setHasMore(res.jobs.length === PAGE_SIZE);
      } catch (err) {
        console.error('Failed to load jobs', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 🔹 Search effect
  useEffect(() => {
    setPage(1);
    loadJobs(debouncedSearch, 1);
  }, [debouncedSearch, loadJobs]);

  // 🔹 Infinite scroll
  const [observerRef, entries] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '120px',
  });

  useEffect(() => {
    if (
      entries[0]?.isIntersecting &&
      hasMore &&
      !loading &&
      viewMode === 'grid'
    ) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadJobs(debouncedSearch, nextPage, true);
    }
  }, [entries, hasMore, loading, page, viewMode, debouncedSearch, loadJobs]);

  // 🔹 Handlers
  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsDetailsOpen(true);
  };

  const handleApplyNow = (job: Job) => {
    setSelectedJob(job);
    setIsDetailsOpen(false);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: ApplicationForm) => {
    setApplicantName(data.name);
    setAppliedJobTitle(data.jobTitle);
    setIsFormOpen(false);
    setIsSuccessOpen(true);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Job Portal
            </h1>
          </div>
          <span className="text-sm text-gray-600">{total} jobs</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* SEARCH */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search job title or company..."
            className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* VIEW MODE */}
        <div className="flex justify-end gap-2 mb-6">
          {['grid', 'table'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`px-4 py-2 rounded-lg ${viewMode === mode
                ? 'bg-blue-600 text-white'
                : 'bg-white border hover:bg-gray-100'
                }`}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>

        {/* JOB LIST */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} onViewDetails={handleViewDetails} />
            ))}
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            {hasMore && <div ref={observerRef} className="h-10 col-span-full" />}
          </div>
        ) : (
          <>
            <JobTable jobs={jobs} onViewDetails={handleViewDetails} />

            {/* PAGINATION */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-3">
                <button
                  disabled={page === 1}
                  onClick={() => {
                    const p = page - 1;
                    setPage(p);
                    loadJobs(debouncedSearch, p);
                  }}
                  className="
        flex items-center gap-2 px-4 py-2 rounded-lg border
        bg-white text-gray-700
        hover:bg-gray-100
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all
      "
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <button
                  disabled={page >= totalPages}
                  onClick={() => {
                    const p = page + 1;
                    setPage(p);
                    loadJobs(debouncedSearch, p);
                  }}
                  className="
                    flex items-center gap-2 px-4 py-2 rounded-lg border
                    bg-white text-gray-700
                    hover:bg-gray-100
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all
                  "
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* MODALS */}
      <JobDetailsModal
        isOpen={isDetailsOpen}
        job={selectedJob}
        onClose={() => setIsDetailsOpen(false)}
        onApply={handleApplyNow}
      />

      <ApplicationFormModal
        isOpen={isFormOpen}
        job={selectedJob}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        name={applicantName}
        jobTitle={appliedJobTitle}
        onClose={() => setIsSuccessOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <JobPortalDashboard />
    </ErrorBoundary>
  );
}
