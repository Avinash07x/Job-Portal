import React from 'react';
import { CheckCircle } from 'lucide-react';
import aboutImg from '../assets/hero-gallery-2.jpg';

const features: string[] = [
  'Verified Companies & Jobs',
  'AI-Powered Job Matching',
  'Career Growth Resources',
  'Seamless Application Process',
];

const About: React.FC = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-100 rounded-full z-0"></div>

            <img
              src={aboutImg}
              alt="Team working"
              loading="lazy"
              className="relative z-10 rounded-2xl shadow-xl w-full object-cover h-[500px]"
            />

            <div className="absolute bottom-8 left-8 z-20 bg-white p-6 rounded-xl shadow-lg max-w-xs hidden sm:block">
              <p className="text-4xl font-bold text-blue-600 mb-1">98%</p>
              <p className="text-gray-600 font-medium">
                Success rate in matching candidates with top companies
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase mb-3">
              About Us
            </h2>

            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              We Help You Find Your Perfect Career Match
            </h3>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              JobPortal is more than just a job board. We are a comprehensive career platform designed to connect talented professionals with forward-thinking companies. Our AI-driven matching technology ensures that you find opportunities that align with your skills, values, and career goals.
            </p>

            <div className="space-y-4">
              {features.map((item: string) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-600" size={14} />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-10 bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Learn More About Us
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
