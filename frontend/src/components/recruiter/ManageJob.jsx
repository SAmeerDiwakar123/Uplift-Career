import Navbar from '../shared/Navbar'
import { Edit2, Eye, Plus, Search, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs, setSearchJobByText } from '@/redux/jobSlice'
import BottomNav from '../shared/BottomNav'

const ManageJob = () => {

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null)
  const [open, setOpen] = useState(false)
  const { searchJobByText, alljobs } = useSelector(store => store.job);
  const [filteredJobs, setFilteredJobs] = useState(alljobs);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => { dispatch(setSearchJobByText(search)); }, [search])

  useEffect(() => {
    const filtered = alljobs.filter(job => job.title.toLowerCase().includes(searchJobByText.toLowerCase()));
    setFilteredJobs(filtered);
  }, [searchJobByText, alljobs])

  const [input, setInput] = useState({
    title: "", description: "", requirements: "", salary: "",
    location: "", jobType: "", experienceLevel: "", position: "", companyId: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getRecruiterJobs`, { withCredentials: true })
        if (res.data.success) {
          setJobs(res.data.jobs);
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) { console.log(error); }
    };
    fetchJobs();
  }, [])

  const handleEdit = (job) => {
    setSelectedJob(job);
    setInput({
      title: job.title || "", description: job.description || "",
      requirements: job.requirements?.join(", ") || "",
      salary: job.salary || "", location: job.location || "",
      jobType: job.jobType || "", experience: job.experience || "", position: job.position || "",
    })
    setOpen(true)
  }

  const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${selectedJob._id}`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        setJobs(jobs.map(j => j._id === selectedJob._id ? { ...j, ...input } : j));
        toast.success("Job updated!");
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally { setUpdateLoading(false); }
  };

  const deleteJob = async (jobId) => {
    if (!confirm("Delete karna chahte ho?")) return;
    try {
      await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, { withCredentials: true });
      setJobs(jobs.filter(j => j._id !== jobId));
      toast.success("Job deleted!");
    } catch (error) { toast.error("Delete nahi hua!"); }
  };

  const inputClass = "border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 w-full";
  const labelClass = "text-xs sm:text-sm font-medium text-gray-700";

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      <Navbar />

      <div className='max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6'>

        {/* Header */}
        <div className='flex items-center justify-between mb-4'>
          <div>
            <h1 className='text-lg sm:text-2xl font-bold text-gray-900'>Manage Jobs</h1>
            <p className='text-[10px] sm:text-xs text-gray-500'>{filteredJobs.length} jobs posted</p>
          </div>
          <button
            onClick={() => navigate('/recruiter/add-jobs')}
            className='flex items-center gap-1.5 bg-indigo-600 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:bg-indigo-700 transition'
          >
            <Plus size={13} /> Post Job
          </button>
        </div>

        {/* Search */}
        <div className='relative mb-3 sm:mb-4'>
          <Search size={13} className='absolute left-3 top-2.5 text-gray-400' />
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search jobs...'
            className='w-full pl-8 pr-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white'
          />
        </div>

        {/* Table */}
        <div className='bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-x-auto'>
          <table className='w-full text-xs sm:text-sm'>
            <thead>
              <tr className='border-b border-gray-100'>
                <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold'>#</th>
                <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold'>Title</th>
                <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold hidden sm:table-cell'>Company</th>
                <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold hidden sm:table-cell'>Location</th>
                <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold'>Type</th>
                <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold hidden sm:table-cell'>Salary</th>
                <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold hidden sm:table-cell'>Date</th>
                <th className='text-left py-2.5 px-3 text-[10px] sm:text-xs text-gray-600 font-semibold'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job, index) => (
                <tr key={index} className='border-b border-gray-50 hover:bg-gray-50 transition'>
                  <td className='py-2.5 px-3 text-gray-500'>{1 + index}</td>
                  <td className='py-2.5 px-3 font-medium text-gray-800 max-w-[100px] truncate'>{job?.title}</td>
                  <td className='py-2.5 px-3 text-gray-600 hidden sm:table-cell'>{job?.company?.name}</td>
                  <td className='py-2.5 px-3 text-gray-600 hidden sm:table-cell'>{job?.location}</td>
                  <td className='py-2.5 px-3 text-gray-600'>{job?.jobType}</td>
                  <td className='py-2.5 px-3 text-gray-600 hidden sm:table-cell'>{job?.salary}LPA</td>
                  <td className='py-2.5 px-3 text-gray-600 hidden sm:table-cell'>
                    {new Date(job?.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className='py-2.5 px-3'>
                    <div className='flex gap-1.5'>
                      <button onClick={() => handleEdit(job)} className='p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition'>
                        <Edit2 size={12} />
                      </button>
                      <button onClick={() => deleteJob(job._id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition">
                        <Trash2 size={12} />
                      </button>
                      <button onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)} className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition">
                        <Eye size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] sm:max-w-[500px] bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-sm sm:text-lg font-bold text-gray-900">Edit Job</DialogTitle>
          </DialogHeader>

          <form onSubmit={updateHandler}>
            <div className='flex flex-col gap-2.5 sm:gap-3 py-3'>

              <div className='flex flex-col gap-1'>
                <label className={labelClass}>Title</label>
                <input type="text" name="title" value={input.title} onChange={changeHandler} className={inputClass} required />
              </div>

              <div className='flex flex-col gap-1'>
                <label className={labelClass}>Description</label>
                <textarea name='description' value={input.description} onChange={changeHandler} rows={3} className={`${inputClass} resize-none`} required />
              </div>

              <div className='flex flex-col gap-1'>
                <label className={labelClass}>Requirements</label>
                <input type="text" name='requirements' value={input.requirements} onChange={changeHandler} placeholder='React, Node.js (comma separated)' className={inputClass} />
              </div>

              <div className='grid grid-cols-2 gap-2.5'>
                <div className='flex flex-col gap-1'>
                  <label className={labelClass}>Salary (LPA)</label>
                  <input type="number" name='salary' value={input.salary} onChange={changeHandler} className={inputClass} />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className={labelClass}>Location</label>
                  <input type="text" name='location' value={input.location} onChange={changeHandler} className={inputClass} />
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className={labelClass}>Job Type</label>
                <select name='jobType' value={input.jobType} onChange={changeHandler} className={`${inputClass} bg-white`}>
                  <option value="">Select Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div className='grid grid-cols-2 gap-2.5'>
                <div className='flex flex-col gap-1'>
                  <label className={labelClass}>Positions</label>
                  <input type="number" name='position' value={input.position} onChange={changeHandler} className={inputClass} />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className={labelClass}>Experience (Yrs)</label>
                  <input type="number" name='experienceLevel' value={input.experienceLevel} onChange={changeHandler} className={inputClass} />
                </div>
              </div>

            </div>

            <DialogFooter>
              <Button type="submit" disabled={updateLoading} className="w-full bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg sm:rounded-xl py-2 text-xs sm:text-sm">
                {updateLoading ? "Updating..." : "Update Job"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  )
}

export default ManageJob;