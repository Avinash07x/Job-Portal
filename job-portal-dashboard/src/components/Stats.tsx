import React from 'react';
import { Users, Briefcase, Building2, Globe } from 'lucide-react';

const Stats = () => {
  const stats = [
    { label: 'Active Jobs', value: '10k+', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Companies', value: '5k+', icon: Building2, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Job Seekers', value: '1M+', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Countries', value: '50+', icon: Globe, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 hover:transform hover:scale-105 transition-transform duration-300">
              <div className={`w-16 h-16 ${stat.bg} rounded-full flex items-center justify-center mb-4`}>
                <stat.icon className={`${stat.color}`} size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;