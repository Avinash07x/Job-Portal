// src/types/index.ts

export default interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  description: string;
  image: string;
  companyLogo: string;
}

export default interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  resume: File | null;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
}

export default interface ApiResponse {
  jobs: Job[];
  total: number;
  page: number;
}
