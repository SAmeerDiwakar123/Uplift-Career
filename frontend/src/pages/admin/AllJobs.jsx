import React, { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import axios from 'axios';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import { Search, Loader2, Trash2, MapPin, Building, Calendar, Users } from 'lucide-react';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const getAllJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`${ADMIN_API_END_POINT}/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data?.success) {
        setJobs(res.data.jobs || []);
      }
    } catch (error) {
      console.log('Error fetching admin jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job listing?')) return;

    try {
      setDeleteLoadingId(jobId);
      const token = localStorage.getItem('token');
      const res = await axios.delete(`${ADMIN_API_END_POINT}/jobs/delete/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data?.success) {
        setJobs((prev) => prev.filter((job) => job._id !== jobId));
      }
    } catch (error) {
      console.log('Error deleting job:', error);
      alert('Failed to delete job');
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job?.title?.toLowerCase().includes(search.toLowerCase());
    const companyMatch = job?.company?.name?.toLowerCase().includes(search.toLowerCase());
    return titleMatch || companyMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Job Postings</h1>
            <p className="text-sm text-gray-500 mt-1">Review and manage active platform job listings</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border text-sm font-medium text-gray-600">
            Total Posted: <span className="font-bold text-blue-600">{jobs.length}</span>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Grid Card Layout (Unique from Table) */}
        {loading ? (
          <div className="text-center py-16 text-gray-500">
            <Loader2 className="animate-spin inline mr-2 text-blue-600" size={24} />
            Loading job cards...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 border">
            No jobs found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job._id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                
                <div>
                  {/* Top Row: Title & Company */}
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base line-clamp-1">{job?.title}</h3>
                      <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-1">
                        <Building size={14} className="text-blue-600" />
                        {job?.company?.name || job?.company || 'N/A'}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      {job?.jobType || 'Full-time'}
                    </span>
                  </div>

                  {/* Badges: Location & Applications */}
                  <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                    <span className="flex items-center gap-1 text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                      <MapPin size={13} className="text-gray-400" />
                      {job?.location || 'Remote'}
                    </span>
                    <span className="flex items-center gap-1 text-purple-700 bg-purple-50 px-2 py-1 rounded-md font-semibold">
                      <Users size={13} />
                      {job?.applications?.length || 0} Applied
                    </span>
                  </div>
                </div>

                {/* Footer: Date & Delete Button */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-2">
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Calendar size={12} />
                    {job?.createdAt ? new Date(job.createdAt).toLocaleDateString('en-IN') : 'N/A'}
                  </span>

                  <button
                    disabled={deleteLoadingId === job._id}
                    onClick={() => handleDeleteJob(job._id)}
                    className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 font-medium text-xs rounded-lg border border-red-200 transition flex items-center gap-1"
                  >
                    {deleteLoadingId === job._id ? (
                      <Loader2 className="animate-spin" size={13} />
                    ) : (
                      <>
                        <Trash2 size={13} /> Delete Job
                      </>
                    )}
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AllJobs;