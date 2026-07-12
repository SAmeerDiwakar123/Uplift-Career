import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT, COMPANY_API_END_POINT, INTERNSHIP_API_END_POINT } from '@/utils/constant';
import { Briefcase, Building } from 'lucide-react';

const AddJobs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('job');
  const [companies, setCompanies] = useState([]);

  // Job form
  const [jobInput, setJobInput] = useState({
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

  // Internship form
  const [internInput, setInternInput] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    isRemote: false,
    stipend: '',
    duration: '',
    openings: '',
    skills: '',
    applyBy: '',
    category: '',
    isPPO: false,
  });

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

  const inputClass = "border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 w-full bg-white";
  const labelClass = "text-xs font-medium text-gray-600";

  // Submit Job
  const submitJob = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, jobInput, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/recruiter/manage-jobs');
      }
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Submit Internship
  const submitInternship = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${INTERNSHIP_API_END_POINT}/post`, internInput, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/recruiter/manage-internships');
      }
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-gray-900">Post Opportunity</h1>
          <p className="text-sm text-gray-400 mt-0.5">Post a job or internship for students</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5 bg-gray-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('job')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition ${
              activeTab === 'job'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            <Briefcase size={15} />
            Post Job
          </button>
          <button
            onClick={() => setActiveTab('internship')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition ${
              activeTab === 'internship'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            <Building size={15} />
            Post Internship
          </button>
        </div>

        {/* ─── JOB FORM ─── */}
        {activeTab === 'job' && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Job Details</h2>
            <form onSubmit={submitJob} className="flex flex-col gap-4">

              <div className="flex flex-col gap-1">
                <label className={labelClass}>Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={jobInput.title}
                  onChange={(e) => setJobInput({ ...jobInput, title: e.target.value })}
                  placeholder="e.g. Frontend Developer"
                  className={inputClass}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className={labelClass}>Description *</label>
                <textarea
                  name="description"
                  value={jobInput.description}
                  onChange={(e) => setJobInput({ ...jobInput, description: e.target.value })}
                  placeholder="Job description..."
                  rows={3}
                  className={inputClass}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className={labelClass}>Requirements (comma separated)</label>
                <input
                  type="text"
                  value={jobInput.requirements}
                  onChange={(e) => setJobInput({ ...jobInput, requirements: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Salary (LPA) *</label>
                  <input
                    type="number"
                    value={jobInput.salary}
                    onChange={(e) => setJobInput({ ...jobInput, salary: e.target.value })}
                    placeholder="6"
                    className={inputClass}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Location *</label>
                  <input
                    type="text"
                    value={jobInput.location}
                    onChange={(e) => setJobInput({ ...jobInput, location: e.target.value })}
                    placeholder="Bangalore"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Job Type *</label>
                  <select
                    value={jobInput.jobType}
                    onChange={(e) => setJobInput({ ...jobInput, jobType: e.target.value })}
                    className={inputClass}
                    required
                  >
                    <option value="">Select type</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Remote</option>
                    <option>Contract</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Experience (yrs)</label>
                  <input
                    type="number"
                    value={jobInput.experienceLevel}
                    onChange={(e) => setJobInput({ ...jobInput, experienceLevel: e.target.value })}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Openings</label>
                  <input
                    type="number"
                    value={jobInput.position}
                    onChange={(e) => setJobInput({ ...jobInput, position: e.target.value })}
                    placeholder="3"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Company *</label>
                  <select
                    value={jobInput.companyId}
                    onChange={(e) => setJobInput({ ...jobInput, companyId: e.target.value })}
                    className={inputClass}
                    required
                  >
                    <option value="">Select company</option>
                    {companies.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white text-sm font-semibold py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-60 mt-1"
              >
                {loading ? 'Posting...' : 'Post Job'}
              </button>
            </form>
          </div>
        )}

        {/* ─── INTERNSHIP FORM ─── */}
        {activeTab === 'internship' && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Internship Details</h2>
            <form onSubmit={submitInternship} className="flex flex-col gap-4">

              <div className="flex flex-col gap-1">
                <label className={labelClass}>Internship Title *</label>
                <input
                  type="text"
                  value={internInput.title}
                  onChange={(e) => setInternInput({ ...internInput, title: e.target.value })}
                  placeholder="e.g. React Developer Intern"
                  className={inputClass}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className={labelClass}>Description *</label>
                <textarea
                  value={internInput.description}
                  onChange={(e) => setInternInput({ ...internInput, description: e.target.value })}
                  placeholder="Internship description..."
                  rows={3}
                  className={inputClass}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className={labelClass}>Skills Required (comma separated)</label>
                <input
                  type="text"
                  value={internInput.skills}
                  onChange={(e) => setInternInput({ ...internInput, skills: e.target.value })}
                  placeholder="React, CSS, JavaScript"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Stipend (₹/month)</label>
                  <input
                    type="number"
                    value={internInput.stipend}
                    onChange={(e) => setInternInput({ ...internInput, stipend: e.target.value })}
                    placeholder="10000"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Location *</label>
                  <input
                    type="text"
                    value={internInput.location}
                    onChange={(e) => setInternInput({ ...internInput, location: e.target.value })}
                    placeholder="Delhi / Remote"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Duration *</label>
                  <select
                    value={internInput.duration}
                    onChange={(e) => setInternInput({ ...internInput, duration: e.target.value })}
                    className={inputClass}
                    required
                  >
                    <option value="">Select duration</option>
                    <option>1 month</option>
                    <option>2 months</option>
                    <option>3 months</option>
                    <option>6 months</option>
                    <option>1 year</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Openings</label>
                  <input
                    type="number"
                    value={internInput.openings}
                    onChange={(e) => setInternInput({ ...internInput, openings: e.target.value })}
                    placeholder="5"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Category</label>
                  <select
                    value={internInput.category}
                    onChange={(e) => setInternInput({ ...internInput, category: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select category</option>
                    <option>Web Development</option>
                    <option>Data Science</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                    <option>HR</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Apply By</label>
                  <input
                    type="date"
                    value={internInput.applyBy}
                    onChange={(e) => setInternInput({ ...internInput, applyBy: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Company */}
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Company *</label>
                <select
                  value={internInput.company}
                  onChange={(e) => setInternInput({ ...internInput, company: e.target.value })}
                  className={inputClass}
                  required
                >
                  <option value="">Select company</option>
                  {companies.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Checkboxes */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={internInput.isRemote}
                    onChange={(e) => setInternInput({ ...internInput, isRemote: e.target.checked })}
                    className="w-4 h-4 accent-emerald-500"
                  />
                  Remote / WFH
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={internInput.isPPO}
                    onChange={(e) => setInternInput({ ...internInput, isPPO: e.target.checked })}
                    className="w-4 h-4 accent-emerald-500"
                  />
                  PPO Available
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white text-sm font-semibold py-3 rounded-xl hover:bg-emerald-700 transition disabled:opacity-60 mt-1"
              >
                {loading ? 'Posting...' : 'Post Internship'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default AddJobs;