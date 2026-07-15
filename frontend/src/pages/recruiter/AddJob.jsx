import React, { useState, useEffect } from 'react';
import Navbar from '../../components/shared/Navbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT, COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { ArrowLeft, Briefcase } from 'lucide-react';

const AddJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    position: '',
    companyId: '',
  });

  const inputClass = "border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 w-full bg-white";
  const labelClass = "text-xs font-medium text-gray-600 mb-1";

  // Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) setCompanies(res.data.companies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      toast.error('Please select a company');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success('Job posted successfully!');
        navigate('/recruiter/manage-jobs');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
          >
            <ArrowLeft size={15} />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Briefcase size={18} className="text-indigo-500" />
              Post a Job
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Fill in the details to post a new job</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Title */}
            <div className="flex flex-col">
              <label className={labelClass}>Job Title *</label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className={inputClass}
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className={labelClass}>Description *</label>
              <textarea
                name="description"
                value={input.description}
                onChange={handleChange}
                placeholder="Describe the job role and responsibilities..."
                rows={4}
                className={`${inputClass} resize-none`}
                required
              />
            </div>

            {/* Requirements */}
            <div className="flex flex-col">
              <label className={labelClass}>Requirements (comma separated)</label>
              <input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, TypeScript"
                className={inputClass}
              />
              <p className="text-[10px] text-gray-400 mt-1">Separate skills with commas</p>
            </div>

            {/* Salary + Location */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className={labelClass}>Salary (LPA) *</label>
                <input
                  type="number"
                  name="salary"
                  value={input.salary}
                  onChange={handleChange}
                  placeholder="e.g. 8"
                  className={inputClass}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore / Remote"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Job Type + Experience */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className={labelClass}>Job Type *</label>
                <select
                  name="jobType"
                  value={input.jobType}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Experience (years)</label>
                <input
                  type="number"
                  name="experienceLevel"
                  value={input.experienceLevel}
                  onChange={handleChange}
                  placeholder="0 for fresher"
                  className={inputClass}
                  min={0}
                />
              </div>
            </div>

            {/* Openings + Company */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className={labelClass}>Openings</label>
                <input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={handleChange}
                  placeholder="e.g. 3"
                  className={inputClass}
                  min={1}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Company *</label>
                <select
                  name="companyId"
                  value={input.companyId}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select company</option>
                  {companies.length === 0 ? (
                    <option disabled>No companies found</option>
                  ) : (
                    companies.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* No companies warning */}
            {companies.length === 0 && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-600">
                ⚠️ No companies found.{' '}
                <span
                  onClick={() => navigate('/recruiter/create-company')}
                  className="underline cursor-pointer font-medium"
                >
                  Create a company first
                </span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 mt-1">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 border border-gray-200 text-gray-500 text-sm font-medium py-3 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || companies.length === 0}
                className="flex-1 bg-indigo-600 text-white text-sm font-semibold py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-60"
              >
                {loading ? 'Posting...' : 'Post Job'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default AddJob;