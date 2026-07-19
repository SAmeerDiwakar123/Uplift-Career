import React, { useState, useEffect } from 'react';
import Navbar from "../../components/shared/Navbar"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Edit2, Eye, Plus, Search, Trash2, Briefcase } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Button } from '../../components/ui/button'; 
import BottomNav from '@/components/shared/BottomNav';

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [input, setInput] = useState({
    title: '', description: '', requirements: '',
    salary: '', location: '', jobType: '', experienceLevel: '', position: '',
  });

  const inputClass = "border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 w-full bg-white";
  const labelClass = "text-xs font-medium text-gray-600";

  // Fetch Jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getRecruiterJobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setJobs(res.data.jobs);
          setFilteredJobs(res.data.jobs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  // Search Filter
  useEffect(() => {
    const filtered = jobs.filter(j =>
      j.title?.toLowerCase().includes(search.toLowerCase()) ||
      j.company?.name?.toLowerCase().includes(search.toLowerCase()) ||
      j.location?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [search, jobs]);

  // Edit
  const handleEdit = (job) => {
    setSelectedJob(job);
    setInput({
      title: job.title || '',
      description: job.description || '',
      requirements: job.requirements?.join(', ') || '',
      salary: job.salary || '',
      location: job.location || '',
      jobType: job.jobType || '',
      experienceLevel: job.experienceLevel || '',
      position: job.position || '',
    });
    setOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${selectedJob._id}`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        setJobs(jobs.map(j => j._id === selectedJob._id ? { ...j, ...input } : j));
        toast.success('Job updated!');
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Job delete karna chahte ho?')) return;
    try {
      await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, { withCredentials: true });
      setJobs(jobs.filter(j => j._id !== id));
      toast.success('Job deleted!');
    } catch {
      toast.error('Delete failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Briefcase size={18} className="text-indigo-500" />
              Manage Jobs
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">{filteredJobs.length} jobs posted</p>
          </div>
          <button
            onClick={() => navigate('/recruiter/add-jobs')}
            className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            <Plus size={14} /> Post Job
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={13} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, company, location..."
            className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-white"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold">#</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold">Title</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold hidden md:table-cell">Company</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold hidden md:table-cell">Location</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold">Type</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold hidden md:table-cell">Salary</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold hidden md:table-cell">Posted</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400 text-sm">
                    <Briefcase size={32} className="mx-auto mb-2 opacity-30" />
                    No jobs posted yet
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job, i) => (
                  <tr key={job._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-gray-400 text-xs">{i + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-800 max-w-[120px] truncate">{job?.title}</td>
                    <td className="py-3 px-4 text-gray-500 hidden md:table-cell">{job?.company?.name}</td>
                    <td className="py-3 px-4 text-gray-500 hidden md:table-cell">{job?.location}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-500 border border-indigo-100">
                        {job?.jobType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 hidden md:table-cell">₹{job?.salary} LPA</td>
                    <td className="py-3 px-4 text-gray-400 text-xs hidden md:table-cell">
                      {new Date(job?.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1.5">
                        <button onClick={() => handleEdit(job)} className="p-1.5 rounded-lg bg-indigo-50 text-indigo-500 hover:bg-indigo-500 hover:text-white transition">
                          <Edit2 size={12} />
                        </button>
                        <button onClick={() => handleDelete(job._id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition">
                          <Trash2 size={12} />
                        </button>
                        <button onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)} className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition">
                          <Eye size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] sm:max-w-[500px] bg-white rounded-2xl p-5" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold text-gray-900">Edit Job</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col gap-3 py-3">
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Title</label>
                <input type="text" value={input.title} onChange={(e) => setInput({ ...input, title: e.target.value })} className={inputClass} required />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Description</label>
                <textarea value={input.description} onChange={(e) => setInput({ ...input, description: e.target.value })} rows={3} className={`${inputClass} resize-none`} />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Requirements (comma separated)</label>
                <input type="text" value={input.requirements} onChange={(e) => setInput({ ...input, requirements: e.target.value })} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Salary (LPA)</label>
                  <input type="number" value={input.salary} onChange={(e) => setInput({ ...input, salary: e.target.value })} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Location</label>
                  <input type="text" value={input.location} onChange={(e) => setInput({ ...input, location: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Job Type</label>
                  <select value={input.jobType} onChange={(e) => setInput({ ...input, jobType: e.target.value })} className={inputClass}>
                    <option value="">Select</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Experience (yrs)</label>
                  <input type="number" value={input.experienceLevel} onChange={(e) => setInput({ ...input, experienceLevel: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Openings</label>
                <input type="number" value={input.position} onChange={(e) => setInput({ ...input, position: e.target.value })} className={inputClass} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={updateLoading} className="w-full bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl py-2 text-sm">
                {updateLoading ? 'Updating...' : 'Update Job'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <BottomNav/>
    </div>
  );
};

export default ManageJobs;