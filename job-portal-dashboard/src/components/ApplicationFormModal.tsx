import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import type { Job, ApplicationForm } from '../types';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onSubmit: (data: ApplicationForm) => void;
}

const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
  isOpen,
  onClose,
  job,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ApplicationForm>({
    name: '',
    email: '',
    phone: '',
    jobTitle: job?.title || '',
    resume: null,
    question1: '',
    question2: '',
    question3: '',
    question4: '',
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
    onClose();
  };

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-5xl max-h-[100vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* ================= HEADER ================= */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Job Application</h2>
            <p className="text-blue-100 text-sm">
              {job.title} • {job.company}
            </p>
          </div>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* ================= FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-8"
        >

          {/* PERSONAL INFO */}
          <section>
            <h3 className="section-title">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-4">
              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={v => setFormData({ ...formData, name: v })}
                className="mb-0 border border-black/10 rounded-lg px-2 py-1"
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={v => setFormData({ ...formData, email: v })}
                className="mb-0 border border-black/10 rounded-lg px-2 py-1"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={v => setFormData({ ...formData, phone: v })}
                className="mb-0 border border-black/10 rounded-lg px-2 py-1"
              />
              <Input
                readOnly
                value={formData.jobTitle}
                className="bg-gray-100 cursor-not-allowed mb-0 border border-black/10 rounded-lg px-2 py-1"
              />
            </div>
          </section>

          {/* RESUME */}
          <section>
            <h3 className="section-title">Resume Upload</h3>

            <label className="upload-box mt-4 px-1 py-2 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500 transition">
              <Upload className="text-gray-400" />
              <span className="text-sm text-gray-600">
                Click to upload PDF / DOC / DOCX
              </span>
              <input
                type="file"
                required
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {fileName && (
              <p className="text-sm text-blue-600 mt-2">
                Uploaded: {fileName}
              </p>
            )}
          </section>

          {/* QUESTIONS */}
          <section>
            <h3 className="section-title">Additional Information</h3>

            <div className="space-y-4 mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Why are you interested in this role?
              </label>
              <Input
                placeholder="Why are you interested in this role?"
                value={formData.question1}
                onChange={v => setFormData({ ...formData, question1: v })}
                className="mb-0 border border-black/10 rounded-lg px-2 py-1 w-full"
              />
              <label className="block text-sm font-medium text-gray-700">
                Describe your relevant experience
              </label>
              <Input
                placeholder="Describe your relevant experience"
                value={formData.question2}
                onChange={v => setFormData({ ...formData, question2: v })}
                className="mb-0 border border-black/10 rounded-lg px-2 py-1 w-full"
              />
              <label className="block text-sm font-medium text-gray-700">
                Salary Expectation
              </label>
              <Input
                placeholder="Salary Expectation"
                value={formData.question3}
                onChange={v => setFormData({ ...formData, question3: v })}
                className="mb-0 border border-black/10 rounded-lg px-2 py-1 w-full"
              />
              <label className="block text-sm font-medium text-gray-700">
                Availability (e.g. Immediate)
              </label>
              <Input
                placeholder="Availability (e.g. Immediate)"
                value={formData.question4}
                onChange={v => setFormData({ ...formData, question4: v })}
                className="mb-0 border border-black/10 rounded-lg px-2 py-1 w-full"
              />
            </div>
          </section>

          {/* FOOTER */}
          <div className="sticky bottom-0 bg-white pt-6 flex gap-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1 w-full justify-center border border-gray-300 px-4 py-3 rounded-lg"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1 w-full justify-center bg-blue-600 text-white border border-blue-600 hover:bg-blue-500 px-4 py-3 rounded-lg">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationFormModal;

/* ================= UI HELPERS ================= */

const Input = ({
  value,
  onChange,
  className = '',
  ...props
}: any) => (
  <input
    {...props}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`input ${className}`}
  />
);

const Textarea = ({ value, onChange, ...props }: any) => (
  <textarea
    {...props}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="textarea"
  />
);
