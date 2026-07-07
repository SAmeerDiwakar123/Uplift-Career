import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import BottomNav from '../shared/BottomNav'

const AddJobs = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  })

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
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

  const inputClass = "border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 w-full";
  const labelClass = "text-xs sm:text-sm font-medium text-gray-700";

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      <Navbar />

      <div className='px-3 sm:px-6 py-4 sm:py-6'>
        <div className='max-w-3xl mx-auto'>

          {/* Header */}
          <div className="mb-4">
            <h1 className='text-lg sm:text-2xl font-bold text-gray-900'>Post a Job</h1>
            <p className='text-xs sm:text-sm text-gray-500 mt-0.5'>Fill in the details to post a new job</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4">Job Details</h2>

            <form onSubmit={submitHandler} className='flex flex-col gap-3 sm:gap-4'>

              <div className='flex flex-col gap-1'>
                <label className={labelClass}>Job Title</label>
                <input
                  type="text"
                  name='title'
                  value={input.title}
                  onChange={changeHandler}
                  placeholder='e.g. Frontend Developer'
                  className={inputClass}
                  required
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className={labelClass}>Description</label>
                <textarea
                  name='description'
                  value={input.description}
                  onChange={changeHandler}
                  placeholder='Job Description'
                  rows={3}
                  className={inputClass}
                  required
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className={labelClass}>Requirements</label>
                <input
                  type="text"
                  name='requirements'
                  value={input.requirements}
                  onChange={changeHandler}
                  placeholder='e.g. React, Node.js, MongoDB'
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className='flex flex-col gap-1'>
                  <label className={labelClass}>Salary (LPA)</label>
                  <input
                    type="number"
                    name="salary"
                    value={input.salary}
                    onChange={changeHandler}
                    placeholder='5'
                    className={inputClass}
                    required
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label className={labelClass}>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeHandler}
                    placeholder='Bangalore'
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className='flex flex-col gap-1'>
                  <label className={labelClass}>Job Type</label>
                  <select
                    name="jobType"
                    value={input.jobType}
                    onChange={changeHandler}
                    className={inputClass}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Experience (Yrs)</label>
                  <input
                    type="number"
                    name="experienceLevel"
                    value={input.experienceLevel}
                    onChange={changeHandler}
                    placeholder="e.g. 2"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Positions</label>
                  <input
                    type="number"
                    name="position"
                    value={input.position}
                    onChange={changeHandler}
                    placeholder="e.g. 3"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Company ID <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="companyId"
                    value={input.companyId}
                    onChange={changeHandler}
                    placeholder="Company ID"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className="w-full bg-indigo-600 text-white text-xs sm:text-sm font-semibold py-2.5 rounded-lg sm:rounded-xl hover:bg-indigo-700 transition disabled:opacity-60 mt-1"
              >
                {loading ? "Posting..." : "Post Job"}
              </button>

            </form>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default AddJobs