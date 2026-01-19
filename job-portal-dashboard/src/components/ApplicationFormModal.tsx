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

  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    if (job) {
      setFormData((prev: ApplicationForm) => ({
        ...prev,
        jobTitle: job.title,
      }));
    }
  }, [job]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setFormData((prev: ApplicationForm) => ({
        ...prev,
        resume: file,
      }));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center">
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">

          <input
            type="text"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="input"
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="input"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="input"
          />

          <input
            readOnly
            value={formData.jobTitle}
            className="input bg-gray-100"
          />

          <label className="upload-box">
            <Upload className="text-gray-400" />
            <span className="text-sm text-gray-600">
              Upload Resume (PDF/DOC)
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {fileName && (
            <p className="text-sm text-blue-600">
              Uploaded: {fileName}
            </p>
          )}

          <textarea
            placeholder="Why are you interested?"
            required
            value={formData.question1}
            onChange={(e) =>
              setFormData({ ...formData, question1: e.target.value })
            }
            className="textarea"
          />

          <textarea
            placeholder="Relevant experience"
            required
            value={formData.question2}
            onChange={(e) =>
              setFormData({ ...formData, question2: e.target.value })
            }
            className="textarea"
          />

          <input
            placeholder="Salary Expectation"
            required
            value={formData.question3}
            onChange={(e) =>
              setFormData({ ...formData, question3: e.target.value })
            }
            className="input"
          />

          <input
            placeholder="Availability"
            required
            value={formData.question4}
            onChange={(e) =>
              setFormData({ ...formData, question4: e.target.value })
            }
            className="input"
          />

          <button type="submit" className="btn-primary">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationFormModal;
