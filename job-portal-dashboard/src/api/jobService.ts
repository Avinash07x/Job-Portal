import type { Job, ApiResponse } from '../types';
import { mockJobs } from '../data/jobs';

const fetchJobs = async (search: string, page: number): Promise<ApiResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const filtered = search
    ? mockJobs.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
      )
    : mockJobs;
  
  const start = (page - 1) * 10;
  const end = start + 10;
  
  return {
    jobs: filtered.slice(start, end),
    total: filtered.length,
    page
  };
};

export { fetchJobs };
