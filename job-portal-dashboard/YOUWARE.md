# Job Portal Dashboard

A modern, responsive job portal application built with React, TypeScript, and Tailwind CSS.

## Project Structure

- `src/api/`: API services and mock data handling
- `src/components/`: Reusable UI components
  - `Navbar.tsx`: Responsive navigation bar
  - `Footer.tsx`: Comprehensive footer with links
  - `Hero.tsx`: Landing page hero section with search
  - `Stats.tsx`: Platform statistics display
  - `About.tsx`: About us section with image
  - `JobCard.tsx`: Individual job display card
  - `JobTable.tsx`: Table view for job listings
  - `JobDetailsModal.tsx`: Detailed view of a job
  - `ApplicationFormModal.tsx`: Job application form
  - `SuccessModal.tsx`: Application success confirmation
  - `ErrorBoundary.tsx`: Error handling wrapper
- `src/layouts/`: Layout components
  - `MainLayout.tsx`: Main application layout with Navbar and Footer
- `src/pages/`: Application pages
  - `Home.tsx`: Main landing page with Hero, Stats, About, and Jobs
  - `auth/Login.tsx`: User/Employer/Admin login
  - `auth/Signup.tsx`: User/Employer registration
  - `admin/AdminDashboard.tsx`: Admin management dashboard
- `src/data/`: Static data (mock jobs)
- `src/hooks/`: Custom React hooks
- `src/types/`: TypeScript interfaces and types
- `src/App.tsx`: Main application router

## Features

- **Landing Page**: Hero section, Stats, About Us, and Job Listings
- **Job Listing**: Grid and Table views for browsing jobs
- **Search**: Real-time search with debouncing
- **Authentication UI**: Login and Signup pages with role selection
- **Admin Dashboard UI**: Overview of platform statistics
- **Responsive Design**: Optimized for mobile and desktop
- **Job Details**: Modal view for job descriptions
- **Application Flow**: Multi-step application form with validation

## Tech Stack

- **Frontend**: React 18, TypeScript, React Router 6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite 7

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
