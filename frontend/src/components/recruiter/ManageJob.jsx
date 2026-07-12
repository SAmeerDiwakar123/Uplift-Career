import Navbar from '../shared/Navbar'
import { Edit2, Eye, Plus, Search, Trash2, Briefcase, Building } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT, INTERNSHIP_API_END_POINT } from '@/utils/constant'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs, setSearchJobByText } from '@/redux/jobSlice'
import BottomNav from '../shared/BottomNav'

const ManageJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('jobs');

  // Jobs state
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobSearch, setJobSearch] = useState('');
  const [jobOpen, setJobOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobUpdateLoading, setJobUpdateLoading] = useState(false);
  const [jobInput, setJobInput] = useState({
    title: '', description: '', requirements: '',
    salary: '', location: '', jobType: '', experienceLevel: '', position: '',
  });

  // Internships state
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [internSearch, setInternSearch] = useState('');
  const [internOpen, setInternOpen] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [internUpdateLoading, setInternUpdateLoading] = useState(false);
  const [internInput, setInternInput] = useState({
    title: '', description: '', location: '',
    stipend: '', duration: '', openings: '', isRemote: false, isPPO: false,
  });

  const inputClass = "border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 w-full bg-white";
  const labelClass = "text-xs font-medium text-gray-600";

  // ─── Fetch Jobs ───
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });
        if (res.data.success) {
          setJobs(res.data.jobs);
          setFilteredJobs(res.data.jobs);
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) { console.log(error); }
    };
    fetchJobs();
  }, []);

  // ─── Fetch Internships ───
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get(`${INTERNSHIP_API_END_POINT}/my-internships`, { withCredentials: true });
        if (res.data.success) {
          setInternships(res.data.internships);
          setFilteredInternships(res.data.internships);
        }
      } catch (error) { console.log(error); }
    };
    fetchInternships();
  }, []);

  // ─── Job Search ───
  useEffect(() => {
    const filtered = jobs.filter(j =>
      j.title?.toLowerCase().includes(jobSearch.toLowerCase()) ||
      j.company?.name?.toLowerCase().includes(jobSearch.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [jobSearch, jobs]);

  // ─── Internship Search ───
  useEffect(() => {
    const filtered = internships.filter(i =>
      i.title?.toLowerCase().includes(internSearch.toLowerCase()) ||
      i.company?.name?.toLowerCase().includes(internSearch.toLowerCase())
    );
    setFilteredInternships(filtered);
  }, [internSearch, internships]);

  // ─── Job Edit ───
  const handleEditJob = (job) => {
    setSelectedJob(job);
    setJobInput({
      title: job.title || '',
      description: job.description || '',
      requirements: job.requirements?.join(', ') || '',
      salary: job.salary || '',
      location: job.location || '',
      jobType: job.jobType || '',
      experienceLevel: job.experienceLevel || '',
      position: job.position || '',
    });
    setJobOpen(true);
  };

  const updateJob = async (e) => {
    e.preventDefault();
    try {
      setJobUpdateLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${selectedJob._id}`, jobInput, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        setJobs(jobs.map(j => j._id === selectedJob._id ? { ...j, ...jobInput } : j));
        toast.success('Job updated!');
        setJobOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally { setJobUpdateLoading(false); }
  };

  const deleteJob = async (id) => {
    if (!confirm('Delete karna chahte ho?')) return;
    try {
      await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, { withCredentials: true });
      setJobs(jobs.filter(j => j._id !== id));
      toast.success('Job deleted!');
    } catch { toast.error('Delete failed!'); }
  };

  // ─── Internship Edit ───
  const handleEditIntern = (intern) => {
    setSelectedIntern(intern);
    setInternInput({
      title: intern.title || '',
      description: intern.description || '',
      location: intern.location || '',
      stipend: intern.stipend || '',
      duration: intern.duration || '',
      openings: intern.openings || '',
      isRemote: intern.isRemote || false,
      isPPO: intern.isPPO || false,
    });
    setInternOpen(true);
  };

  const updateInternship = async (e) => {
    e.preventDefault();
    try {
      setInternUpdateLoading(true);
      const res = await axios.put(`${INTERNSHIP_API_END_POINT}/update/${selectedIntern._id}`, internInput, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        setInternships(internships.map(i => i._id === selectedIntern._id ? { ...i, ...internInput } : i));
        toast.success('Internship updated!');
        setInternOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally { setInternUpdateLoading(false); }
  };

  const deleteInternship = async (id) => {
    if (!confirm('Delete karna chahte ho?')) return;
    try {
      await axios.delete(`${INTERNSHIP_API_END_POINT}/delete/${id}`, { withCredentials: true });
      setInternships(internships.filter(i => i._id !== id));
      toast.success('Internship deleted!');
    } catch { toast.error('Delete failed!'); }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Manage Opportunities</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {activeTab === 'jobs' ? `${filteredJobs.length} jobs` : `${filteredInternships.length} internships`}
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/add-jobs')}
            className="flex items-center gap-1.5 bg-indigo-600 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            <Plus size={13} /> Post New
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
              activeTab === 'jobs' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            <Briefcase size={14} /> Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('internships')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
              activeTab === 'internships' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            <Building size={14} /> Internships ({internships.length})
          </button>
        </div>

        {/* ─── JOBS TAB ─── */}
        {activeTab === 'jobs' && (
          <>
            <div className="relative mb-3">
              <Search size={13} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                onChange={(e) => setJobSearch(e.target.value)}
                placeholder="Search jobs..."
                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-white"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold">#</th>
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold">Title</th>
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold hidden sm:table-cell">Company</th>
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold hidden sm:table-cell">Location</th>
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold">Type</th>
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold hidden sm:table-cell">Salary</th>
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold hidden sm:table-cell">Date</th>
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-gray-400 text-sm">
                        No jobs posted yet
                      </td>
                    </tr>
                  ) : (
                    filteredJobs.map((job, index) => (
                      <tr key={job._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                        <td className="py-2.5 px-3 text-gray-400">{index + 1}</td>
                        <td className="py-2.5 px-3 font-medium text-gray-800 max-w-[100px] truncate">{job?.title}</td>
                        <td className="py-2.5 px-3 text-gray-500 hidden sm:table-cell">{job?.company?.name}</td>
                        <td className="py-2.5 px-3 text-gray-500 hidden sm:table-cell">{job?.location}</td>
                        <td className="py-2.5 px-3">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-500">{job?.jobType}</span>
                        </td>
                        <td className="py-2.5 px-3 text-gray-500 hidden sm:table-cell">₹{job?.salary} LPA</td>
                        <td className="py-2.5 px-3 text-gray-400 hidden sm:table-cell">
                          {new Date(job?.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex gap-1.5">
                            <button onClick={() => handleEditJob(job)} className="p-1.5 rounded-lg bg-indigo-50 text-indigo-500 hover:bg-indigo-500 hover:text-white transition">
                              <Edit2 size={12} />
                            </button>
                            <button onClick={() => deleteJob(job._id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition">
                              <Trash2 size={12} />
                            </button>
                            <button onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition">
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
          </>
        )}

        {/* ─── INTERNSHIPS TAB ─── */}
        {activeTab === 'internships' && (
          <>
            <div className="relative mb-3">
              <Search size={13} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                onChange={(e) => setInternSearch(e.target.value)}
                placeholder="Search internships..."
                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-white"
              />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold">#</th>
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold">Title</th>
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold hidden sm:table-cell">Company</th>
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold hidden sm:table-cell">Location</th>
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold">Stipend</th>
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold hidden sm:table-cell">Duration</th>
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold hidden sm:table-cell">Date</th>
                    <th className="text-left py-3 px-3 text-xs text-gray-500 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInternships.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-gray-400 text-sm">
                        No internships posted yet
                      </td>
                    </tr>
                  ) : (
                    filteredInternships.map((intern, index) => (
                      <tr key={intern._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                        <td className="py-2.5 px-3 text-gray-400">{index + 1}</td>
                        <td className="py-2.5 px-3 font-medium text-gray-800 max-w-[100px] truncate">{intern?.title}</td>
                        <td className="py-2.5 px-3 text-gray-500 hidden sm:table-cell">{intern?.company?.name}</td>
                        <td className="py-2.5 px-3 text-gray-500 hidden sm:table-cell">{intern?.location}</td>
                        <td className="py-2.5 px-3">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-500">
                            ₹{intern?.stipend}/mo
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-gray-500 hidden sm:table-cell">{intern?.duration}</td>
                        <td className="py-2.5 px-3 text-gray-400 hidden sm:table-cell">
                          {new Date(intern?.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex gap-1.5">
                            <button onClick={() => handleEditIntern(intern)} className="p-1.5 rounded-lg bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white transition">
                              <Edit2 size={12} />
                            </button>
                            <button onClick={() => deleteInternship(intern._id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition">
                              <Trash2 size={12} />
                            </button>
                            <button onClick={() => navigate(`/admin/internship/${intern._id}/applicants`)} className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition">
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
          </>
        )}
      </div>

      {/* ─── EDIT JOB DIALOG ─── */}
      <Dialog open={jobOpen} onOpenChange={setJobOpen}>
        <DialogContent className="w-[95vw] sm:max-w-[500px] bg-white rounded-2xl p-4 sm:p-6" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-sm sm:text-base font-semibold text-gray-900">Edit Job</DialogTitle>
          </DialogHeader>
          <form onSubmit={updateJob}>
            <div className="flex flex-col gap-3 py-3">
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Title</label>
                <input type="text" name="title" value={jobInput.title} onChange={(e) => setJobInput({ ...jobInput, title: e.target.value })} className={inputClass} required />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Description</label>
                <textarea name="description" value={jobInput.description} onChange={(e) => setJobInput({ ...jobInput, description: e.target.value })} rows={3} className={`${inputClass} resize-none`} />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Requirements (comma separated)</label>
                <input type="text" value={jobInput.requirements} onChange={(e) => setJobInput({ ...jobInput, requirements: e.target.value })} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Salary (LPA)</label>
                  <input type="number" value={jobInput.salary} onChange={(e) => setJobInput({ ...jobInput, salary: e.target.value })} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Location</label>
                  <input type="text" value={jobInput.location} onChange={(e) => setJobInput({ ...jobInput, location: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Job Type</label>
                  <select value={jobInput.jobType} onChange={(e) => setJobInput({ ...jobInput, jobType: e.target.value })} className={inputClass}>
                    <option value="">Select</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Remote</option>
                    <option>Contract</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Experience (yrs)</label>
                  <input type="number" value={jobInput.experienceLevel} onChange={(e) => setJobInput({ ...jobInput, experienceLevel: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Openings</label>
                <input type="number" value={jobInput.position} onChange={(e) => setJobInput({ ...jobInput, position: e.target.value })} className={inputClass} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={jobUpdateLoading} className="w-full bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl py-2 text-sm">
                {jobUpdateLoading ? 'Updating...' : 'Update Job'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ─── EDIT INTERNSHIP DIALOG ─── */}
      <Dialog open={internOpen} onOpenChange={setInternOpen}>
        <DialogContent className="w-[95vw] sm:max-w-[500px] bg-white rounded-2xl p-4 sm:p-6" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-sm sm:text-base font-semibold text-gray-900">Edit Internship</DialogTitle>
          </DialogHeader>
          <form onSubmit={updateInternship}>
            <div className="flex flex-col gap-3 py-3">
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Title</label>
                <input type="text" value={internInput.title} onChange={(e) => setInternInput({ ...internInput, title: e.target.value })} className={inputClass} required />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Description</label>
                <textarea value={internInput.description} onChange={(e) => setInternInput({ ...internInput, description: e.target.value })} rows={3} className={`${inputClass} resize-none`} />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Stipend (₹/mo)</label>
                  <input type="number" value={internInput.stipend} onChange={(e) => setInternInput({ ...internInput, stipend: e.target.value })} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Location</label>
                  <input type="text" value={internInput.location} onChange={(e) => setInternInput({ ...internInput, location: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Duration</label>
                  <select value={internInput.duration} onChange={(e) => setInternInput({ ...internInput, duration: e.target.value })} className={inputClass}>
                    <option value="">Select</option>
                    <option>1 month</option>
                    <option>2 months</option>
                    <option>3 months</option>
                    <option>6 months</option>
                    <option>1 year</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Openings</label>
                  <input type="number" value={internInput.openings} onChange={(e) => setInternInput({ ...internInput, openings: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex gap-5">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" checked={internInput.isRemote} onChange={(e) => setInternInput({ ...internInput, isRemote: e.target.checked })} className="w-4 h-4 accent-emerald-500" />
                  Remote
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" checked={internInput.isPPO} onChange={(e) => setInternInput({ ...internInput, isPPO: e.target.checked })} className="w-4 h-4 accent-emerald-500" />
                  PPO Available
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={internUpdateLoading} className="w-full bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl py-2 text-sm">
                {internUpdateLoading ? 'Updating...' : 'Update Internship'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default ManageJob;







// import Navbar from '../shared/Navbar'
// import { Edit2, Eye, Plus, Search, Trash2 } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { JOB_API_END_POINT } from '@/utils/constant'
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
// import { toast } from 'sonner'
// import { Button } from '../ui/button'
// import { useDispatch, useSelector } from 'react-redux'
// import { setAllJobs, setSearchJobByText } from '@/redux/jobSlice'
// import BottomNav from '../shared/BottomNav'

// const ManageJob = () => {

//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [updateLoading, setUpdateLoading] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null)
//   const [open, setOpen] = useState(false)
//   const { searchJobByText, alljobs } = useSelector(store => store.job);
//   const [filteredJobs, setFilteredJobs] = useState(alljobs);
//   const [search, setSearch] = useState("");
//   const dispatch = useDispatch();

//   useEffect(() => { dispatch(setSearchJobByText(search)); }, [search])

//   useEffect(() => {
//     const filtered = alljobs.filter(job => job.title.toLowerCase().includes(searchJobByText.toLowerCase()));
//     setFilteredJobs(filtered);
//   }, [searchJobByText, alljobs])

//   const [input, setInput] = useState({
//     title: "", description: "", requirements: "", salary: "",
//     location: "", jobType: "", experienceLevel: "", position: "", companyId: "",
//   });

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_END_POINT}/getRecruiterJobs`, { withCredentials: true })
//         if (res.data.success) {
//           setJobs(res.data.jobs);
//           dispatch(setAllJobs(res.data.jobs));
//         }
//       } catch (error) { console.log(error); }
//     };
//     fetchJobs();
//   }, [])

//   const handleEdit = (job) => {
//     setSelectedJob(job);
//     setInput({
//       title: job.title || "", description: job.description || "",
//       requirements: job.requirements?.join(", ") || "",
//       salary: job.salary || "", location: job.location || "",
//       jobType: job.jobType || "", experience: job.experience || "", position: job.position || "",
//     })
//     setOpen(true)
//   }

//   const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

//   const updateHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setUpdateLoading(true);
//       const res = await axios.put(`${JOB_API_END_POINT}/update/${selectedJob._id}`, input, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         setJobs(jobs.map(j => j._id === selectedJob._id ? { ...j, ...input } : j));
//         toast.success("Job updated!");
//         setOpen(false);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally { setUpdateLoading(false); }
//   };

//   const deleteJob = async (jobId) => {
//     if (!confirm("Delete karna chahte ho?")) return;
//     try {
//       await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, { withCredentials: true });
//       setJobs(jobs.filter(j => j._id !== jobId));
//       toast.success("Job deleted!");
//     } catch (error) { toast.error("Delete nahi hua!"); }
//   };

//   const inputClass = "border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 w-full";
//   const labelClass = "text-xs sm:text-sm font-medium text-gray-700";

//   return (
//     <div className='min-h-screen bg-gray-50 pb-20'>
//       <Navbar />

//       <div className='max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6'>

//         {/* Header */}
//         <div className='flex items-center justify-between mb-4'>
//           <div>
//             <h1 className='text-lg sm:text-2xl font-bold text-gray-900'>Manage Jobs</h1>
//             <p className='text-[10px] sm:text-xs text-gray-500'>{filteredJobs.length} jobs posted</p>
//           </div>
//           <button
//             onClick={() => navigate('/recruiter/add-jobs')}
//             className='flex items-center gap-1.5 bg-indigo-600 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:bg-indigo-700 transition'
//           >
//             <Plus size={13} /> Post Job
//           </button>
//         </div>

//         {/* Search */}
//         <div className='relative mb-3 sm:mb-4'>
//           <Search size={13} className='absolute left-3 top-2.5 text-gray-400' />
//           <input
//             type="text"
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder='Search jobs...'
//             className='w-full pl-8 pr-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white'
//           />
//         </div>

//         {/* Table */}
//         <div className='bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-x-auto'>
//           <table className='w-full text-xs sm:text-sm'>
//             <thead>
//               <tr className='border-b border-gray-100'>
//                 <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold'>#</th>
//                 <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold'>Title</th>
//                 <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold hidden sm:table-cell'>Company</th>
//                 <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold hidden sm:table-cell'>Location</th>
//                 <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold'>Type</th>
//                 <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold hidden sm:table-cell'>Salary</th>
//                 <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold hidden sm:table-cell'>Date</th>
//                 <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold'>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredJobs.map((job, index) => (
//                 <tr key={index} className='border-b border-gray-50 hover:bg-gray-50 transition'>
//                   <td className='py-2.5 px-3 text-gray-500'>{1 + index}</td>
//                   <td className='py-2.5 px-3 font-medium text-gray-800 max-w-[100px] truncate'>{job?.title}</td>
//                   <td className='py-2.5 px-3 text-gray-600 hidden sm:table-cell'>{job?.company?.name}</td>
//                   <td className='py-2.5 px-3 text-gray-600 hidden sm:table-cell'>{job?.location}</td>
//                   <td className='py-2.5 px-3 text-gray-600'>{job?.jobType}</td>
//                   <td className='py-2.5 px-3 text-gray-600 hidden sm:table-cell'>{job?.salary}LPA</td>
//                   <td className='py-2.5 px-3 text-gray-600 hidden sm:table-cell'>
//                     {new Date(job?.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
//                   </td>
//                   <td className='py-2.5 px-3'>
//                     <div className='flex gap-1.5'>
//                       <button onClick={() => handleEdit(job)} className='p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition'>
//                         <Edit2 size={12} />
//                       </button>
//                       <button onClick={() => deleteJob(job._id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition">
//                         <Trash2 size={12} />
//                       </button>
//                       <button onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)} className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition">
//                         <Eye size={12} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Edit Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="w-[95vw] sm:max-w-[500px] bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6" aria-describedby={undefined}>
//           <DialogHeader>
//             <DialogTitle className="text-sm sm:text-lg font-bold text-gray-900">Edit Job</DialogTitle>
//           </DialogHeader>

//           <form onSubmit={updateHandler}>
//             <div className='flex flex-col gap-2.5 sm:gap-3 py-3'>

//               <div className='flex flex-col gap-1'>
//                 <label className={labelClass}>Title</label>
//                 <input type="text" name="title" value={input.title} onChange={changeHandler} className={inputClass} required />
//               </div>

//               <div className='flex flex-col gap-1'>
//                 <label className={labelClass}>Description</label>
//                 <textarea name='description' value={input.description} onChange={changeHandler} rows={3} className={`${inputClass} resize-none`} required />
//               </div>

//               <div className='flex flex-col gap-1'>
//                 <label className={labelClass}>Requirements</label>
//                 <input type="text" name='requirements' value={input.requirements} onChange={changeHandler} placeholder='React, Node.js (comma separated)' className={inputClass} />
//               </div>

//               <div className='grid grid-cols-2 gap-2.5'>
//                 <div className='flex flex-col gap-1'>
//                   <label className={labelClass}>Salary (LPA)</label>
//                   <input type="number" name='salary' value={input.salary} onChange={changeHandler} className={inputClass} />
//                 </div>
//                 <div className='flex flex-col gap-1'>
//                   <label className={labelClass}>Location</label>
//                   <input type="text" name='location' value={input.location} onChange={changeHandler} className={inputClass} />
//                 </div>
//               </div>

//               <div className='flex flex-col gap-1'>
//                 <label className={labelClass}>Job Type</label>
//                 <select name='jobType' value={input.jobType} onChange={changeHandler} className={`${inputClass} bg-white`}>
//                   <option value="">Select Type</option>
//                   <option value="Full Time">Full Time</option>
//                   <option value="Part Time">Part Time</option>
//                   <option value="Remote">Remote</option>
//                   <option value="Internship">Internship</option>
//                   <option value="Contract">Contract</option>
//                 </select>
//               </div>

//               <div className='grid grid-cols-2 gap-2.5'>
//                 <div className='flex flex-col gap-1'>
//                   <label className={labelClass}>Positions</label>
//                   <input type="number" name='position' value={input.position} onChange={changeHandler} className={inputClass} />
//                 </div>
//                 <div className='flex flex-col gap-1'>
//                   <label className={labelClass}>Experience (Yrs)</label>
//                   <input type="number" name='experienceLevel' value={input.experienceLevel} onChange={changeHandler} className={inputClass} />
//                 </div>
//               </div>

//             </div>

//             <DialogFooter>
//               <Button type="submit" disabled={updateLoading} className="w-full bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg sm:rounded-xl py-2 text-xs sm:text-sm">
//                 {updateLoading ? "Updating..." : "Update Job"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       <BottomNav />
//     </div>
//   )
// }

// export default ManageJob;