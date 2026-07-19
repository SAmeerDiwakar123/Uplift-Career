import React, { useState, useEffect } from 'react';
import Navbar from '../../components/shared/Navbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT, INTERNSHIP_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { ArrowLeft, Building } from 'lucide-react';
import BottomNav from '@/components/shared/BottomNav';

const AddInternship = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  const [input, setInput] = useState({
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

  const inputClass = "border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-300 w-full bg-white";
  const labelClass = "text-xs font-medium text-gray-600 mb-1";

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
    const { name, value, type, checked } = e.target;
    setInput({ ...input, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.company) {
      toast.error('Please select a company');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${INTERNSHIP_API_END_POINT}/post`, {
        ...input,
        skills: input.skills.split(',').map(s => s.trim()).filter(Boolean),
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success('Internship posted successfully!');
        navigate('/admin/manage-internships');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post internship');
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
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition">
            <ArrowLeft size={15} />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Building size={18} className="text-emerald-500" />
              Post Internship
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Fill in the details to post a new internship</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="flex flex-col">
              <label className={labelClass}>Internship Title *</label>
              <input type="text" name="title" value={input.title} onChange={handleChange} placeholder="e.g. React Developer Intern" className={inputClass} required />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Description *</label>
              <textarea name="description" value={input.description} onChange={handleChange} placeholder="Describe the internship role..." rows={4} className={`${inputClass} resize-none`} required />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Skills Required (comma separated)</label>
              <input type="text" name="skills" value={input.skills} onChange={handleChange} placeholder="React, CSS, JavaScript, Git" className={inputClass} />
              <p className="text-[10px] text-gray-400 mt-1">Separate skills with commas</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className={labelClass}>Stipend (₹/month)</label>
                <input type="number" name="stipend" value={input.stipend} onChange={handleChange} placeholder="10000" className={inputClass} min={0} />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Location *</label>
                <input type="text" name="location" value={input.location} onChange={handleChange} placeholder="Delhi / Remote" className={inputClass} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className={labelClass}>Duration *</label>
                <select name="duration" value={input.duration} onChange={handleChange} className={inputClass} required>
                  <option value="">Select duration</option>
                  <option value="1 month">1 month</option>
                  <option value="2 months">2 months</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Openings</label>
                <input type="number" name="openings" value={input.openings} onChange={handleChange} placeholder="5" className={inputClass} min={1} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className={labelClass}>Category</label>
                <select name="category" value={input.category} onChange={handleChange} className={inputClass}>
                  <option value="">Select category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Apply By</label>
                <input type="date" name="applyBy" value={input.applyBy} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Company *</label>
              <select name="company" value={input.company} onChange={handleChange} className={inputClass} required>
                <option value="">Select company</option>
                {companies.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            {companies.length === 0 && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-600">
                ⚠️ No companies found.{' '}
                <span onClick={() => navigate('/admin/create-company')} className="underline cursor-pointer font-medium">
                  Create a company first
                </span>
              </div>
            )}

            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" name="isRemote" checked={input.isRemote} onChange={handleChange} className="w-4 h-4 accent-emerald-500" />
                Remote / WFH
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" name="isPPO" checked={input.isPPO} onChange={handleChange} className="w-4 h-4 accent-emerald-500" />
                PPO Available
              </label>
            </div>

            <div className="flex gap-3 mt-1">
              <button type="button" onClick={() => navigate(-1)} className="flex-1 border border-gray-200 text-gray-500 text-sm font-medium py-3 rounded-xl hover:bg-gray-50 transition">
                Cancel
              </button>
              <button type="submit" disabled={loading || companies.length === 0} className="flex-1 bg-emerald-600 text-white text-sm font-semibold py-3 rounded-xl hover:bg-emerald-700 transition disabled:opacity-60">
                {loading ? 'Posting...' : 'Post Internship'}
              </button>
            </div>

          </form>
        </div>
      </div>
      <BottomNav/>
    </div>
  );
};

export default AddInternship;