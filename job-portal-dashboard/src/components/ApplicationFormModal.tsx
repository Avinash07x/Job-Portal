import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Job, ApplicationForm } from '../types';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onSubmit: (data: ApplicationForm) => void;
}

const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({ isOpen, onClose, job, onSubmit }) => {
  const [formData, setFormData] = useState<ApplicationForm>({
    name: '',
    email: '',
    phone: '',
    jobTitle: job?.title || '',
    resume: null,
    question1: '',
    question2: '',
    question3: '',
    question4: ''
  });

  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (job) {
      setFormData(prev => ({ ...prev, jobTitle: job.title }));
    }
  }, [job]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      jobTitle: job?.title || '',
      resume: null,
      question1: '',
      question2: '',
      question3: '',
      question4: ''
    });
    setFileName('');
  };

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 w-full h-full flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[100vh] overflow-y-auto my-4 sm:my-8 mx-4 sm:mx-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Apply for Position</h2>
            <p className="text-blue-100 mt-1">{job.title} at {job.company}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Applying for Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.jobTitle}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Resume/CV <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <div className="text-center">
                    {fileName ? (
                      <div className="flex items-center gap-2 text-blue-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                        </svg>
                        <span className="font-medium">{fileName}</span>
                      </div>
                    ) : (
                      <>
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Application Questions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Application Questions</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                1. Why are you interested in this position? <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.question1}
                onChange={(e) => setFormData(prev => ({ ...prev, question1: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Tell us what excites you about this role..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                2. What relevant experience do you have? <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.question2}
                onChange={(e) => setFormData(prev => ({ ...prev, question2: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Describe your relevant skills and experience..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                3. What are your salary expectations? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.question3}
                onChange={(e) => setFormData(prev => ({ ...prev, question3: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., $80k - $100k"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                4. When can you start? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.question4}
                onChange={(e) => setFormData(prev => ({ ...prev, question4: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="e.g., 2 weeks notice, Immediately, etc."
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationFormModal;