import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'

const AddJobs = () => {

  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);
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
    setInput({...input, [e.target.name]: e.target.value});
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
        console.log(res.data);
        
        navigate('/admin/manage-jobs');
      }
    } catch (error) {
      console.log(error.response?.data);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className='p-6'>
        <div className='max-w-3xl mx-auto'>

          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Post a Job</h1>
            <p className='text-sm font-sans text-gray-600 mt-1'>Fill in the details to post a new job</p>
          </div>

          <Card className="border border-gray-100 shadow-sm mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="test-lg font-bold text-gray-800">Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                  <label className='text-sm font-medium text-gray-700'>Job Title</label>
                  <input
                    type="text"
                    name='title'
                    value={input.title}
                    onChange={changeHandler}
                    placeholder='e.g. Frontend Developer'
                    className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-indigo-300'
                    required
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label className='text-sm font-medium text-gray-700'>Description</label>
                  <textarea
                    type="text"
                    name='description'
                    value={input.description}
                    onChange={changeHandler}
                    placeholder='Job Description'
                    rows={4}
                    className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-indigo-300'
                    required
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label className='text-sm font-medium text-gray-700'>Requirements</label>
                  <input
                    type="text"
                    name='requirements'
                    value={input.requirements}
                    onChange={changeHandler}
                    placeholder='e.g. React, Node.js, MongoDB'
                    className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-indigo-300'
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>Salary (LPA)</label>
                    <input
                      type="number"
                      name="salary"
                      value={input.salary}
                      onChange={changeHandler}
                      placeholder='5'
                      className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-indigo-300'
                      required
                    />
                  </div>

                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={input.location}
                      onChange={changeHandler}
                      placeholder='Bangalore'
                      className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-indigo-300'
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>Job Type</label>
                    <select
                      name="jobType"
                      value={input.jobType}
                      onChange={changeHandler}
                      className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
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
                    <label className="text-sm font-medium text-gray-700">Experience (Years)</label>
                    <input
                      type="number"
                      name="experienceLevel"
                      value={input.experienceLevel}
                      onChange={changeHandler}
                      placeholder="e.g. 2"
                      className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">No. of Positions</label>
                    <input
                      type="number"
                      name="position"
                      value={input.position}
                      onChange={changeHandler}
                      placeholder="e.g. 3"
                      className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Company ID <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="companyId"
                      value={input.companyId}
                      onChange={changeHandler}
                      placeholder="Company ID"
                      className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      required
                    />
                  </div>
                </div>

                <div className='flex flex-col gap-1'>
                  <button type='submit' className="flex-1 bg-indigo-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2">Post Job</button>
                </div>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AddJobs