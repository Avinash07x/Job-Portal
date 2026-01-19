import type { ApiResponse } from '../types';
import { mockJobs } from '../data/jobs';

const PAGE_SIZE = 10;

export const fetchJobs = async (
  search: string,
  page: number
): Promise<ApiResponse> => {
  await new Promise(res => setTimeout(res, 500));

  const filtered = search
    ? mockJobs.filter(
        job =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase())
      )
    : mockJobs;

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return {
    jobs: filtered.slice(start, end),
    total: filtered.length,
    page,
  };
};
