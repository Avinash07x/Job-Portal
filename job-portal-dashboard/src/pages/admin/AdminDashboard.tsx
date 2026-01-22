import React from 'react';
import { Users, Briefcase, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage users, jobs, and platform settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">1,234</p>
          <p className="text-sm text-green-600 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Active Jobs</h3>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Briefcase className="text-purple-600" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">456</p>
          <p className="text-sm text-green-600 mt-2">+5% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Pending Approvals</h3>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="text-yellow-600" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">23</p>
          <p className="text-sm text-gray-500 mt-2">Requires attention</p>
        </div>
      </div>

      {/* Recent Activity / Tables would go here */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Job Postings</h3>
        <div className="text-center py-12 text-gray-500">
          <p>Connect backend to view real data</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;