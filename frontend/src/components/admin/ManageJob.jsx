import Navbar from '../shared/Navbar'
import { Edit2, Edit2Icon, Eye, Plus, Search, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs, setSearchJobByText } from '@/redux/jobSlice'

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

  useEffect(() => {
    dispatch(setSearchJobByText(search));
  }, [search])

  useEffect(() => {
    const filteredJobs = alljobs.filter(job => job.title.toLowerCase().includes(searchJobByText.toLowerCase()));
    setFilteredJobs(filteredJobs);

  }, [searchJobByText, alljobs])

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
    companyId: "",
  });


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true })
        if (res.data.success) {

          setJobs(res.data.jobs);

          dispatch(
            setAllJobs(res.data.jobs)
          );

        }
      } catch (error) {
        console.log(error);
      }
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
    } finally {
      setUpdateLoading(false);
    }
  };


  const deleteJob = async (jobId) => {
    if (!confirm("Delete karna chahte ho?")) return;
    try {
      await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, { withCredentials: true });
      setJobs(jobs.filter(j => j._id !== jobId));
      toast.success("Job deleted!");
    } catch (error) {
      toast.error("Delete nahi hua!");
    }
  };

  const handleView = (job) => {
    navigate(`/admin/jobs/${job._id}`)
  }


  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className='max-w-6xl mx-auto p-6'>

        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>ManageJob</h1>
            <p className='text-xs font-medium text-gray-700'>jobs posted</p>
          </div>
          <button onClick={() => navigate('/admin/add-jobs')} className='flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-indigo-700 transition'><Plus size={15} />Post Job</button>
        </div>

        <div className='relative mb-4'>
          <Search size={15} className='absolute left-3 top-3 text-gray-400' />
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search your job'
            className='w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white'
          />
        </div>


        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-gray-100'>
                <th className='text-left py-3 px-4 text-xs text-gray-800 font-semibold'>#</th>
                <th className='text-left py-3 px-4 text-xs text-gray-800 font-semibold'>Title</th>
                <th className='text-left py-3 px-4 text-xs text-gray-800 font-semibold'>Company</th>
                <th className='text-left py-3 px-4 text-xs text-gray-800 font-semibold'>Location</th>
                <th className='text-left py-3 px-4 text-xs text-gray-800 font-semibold'>Type</th>
                <th className='text-left py-3 px-4 text-xs text-gray-800 font-semibold'>Salary</th>
                <th className='text-left py-3 px-4 text-xs text-gray-800 font-semibold'>Date</th>
                <th className='text-left py-3 px-4 text-xs text-gray-800 font-semibold'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredJobs.map((job, index) => (
                  <tr key={index} className='border-b border-gray-50 hover:bg-gray-50 transition'>
                    <td>{1 + index}</td>
                    <td>{job?.title}</td>
                    <td>{job?.company?.name}</td>
                    <td>{job?.location}</td>
                    <td>{job?.jobType}</td>
                    <td>{job?.salary}LPA</td>
                    <td> {new Date(job?.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>

                    <td className='py-3 px-4'>
                      <div className='flex gap-2'>
                        <button onClick={() => handleEdit(job)} className='p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition'>
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => deleteJob(job._id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition">
                          <Trash2 size={14} />
                        </button>
                        <button onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition">
                          <Eye size={14} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900">Edit Job</DialogTitle>
          </DialogHeader>

          <form onSubmit={updateHandler}>
            <div className='flex flex-col gap-3 py-4'>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Title</label>
                <input type="text" name="title" value={input.title} onChange={changeHandler}
                  className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300' required />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Description</label>
                <textarea name='description' value={input.description} onChange={changeHandler} rows={3}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none" required />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Requirements</label>
                <input type="text" name='requirements' value={input.requirements} onChange={changeHandler}
                  placeholder='React, Node.js (comma separated)'
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-col gap-1'>
                  <label className='text-sm font-medium text-gray-700'>Salary (LPA)</label>
                  <input type="number" name='salary' value={input.salary} onChange={changeHandler}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-sm font-medium text-gray-700'>Location</label>
                  <input type="text" name='location' value={input.location} onChange={changeHandler}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Job Type</label>
                <select name='jobType' value={input.jobType} onChange={changeHandler}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
                  <option value="">Select Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-col gap-1'>
                  <label className='text-sm font-medium text-gray-700'>Positions</label>
                  <input type="number" name='position' value={input.position} onChange={changeHandler}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className='text-sm font-medium text-gray-700'>Experience (Years)</label>
                  <input type="number" name='experienceLevel' value={input.experienceLevel} onChange={changeHandler}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
              </div>

            </div>

            <DialogFooter>
              <Button type="submit" disabled={updateLoading}
                className="w-full bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl py-2.5">
                {updateLoading ? "Updating..." : "Update Job"}
              </Button>
            </DialogFooter>
          </form>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ManageJob;