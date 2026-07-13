import React, { useEffect, useState } from 'react'
import Navbar from '../../components/shared/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { useSelector } from 'react-redux'
import useGetCompanyByid from '@/hooks/useGetCompanyByid'
import BottomNav from '../../components/shared/BottomNav'

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyByid(params.id);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { singleCompany } = useSelector(store => store.company);

  const [input, setInput] = useState({
    name: "", description: "", location: "", website: "", file: null,
  })

  const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
  const fileChangeHandler = (e) => setInput({ ...input, file: e.target.files?.[0] });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("website", input.website);
    if (input.file) formData.append("file", input.file);
    try {
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, { withCredentials: true });
      if (res.data.success) {
        toast.success("Company updated successfully");
        navigate('/recruiter/companies');
      }
    } catch (error) {
      toast.error("Failed to update company");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      location: singleCompany?.location || "",
      website: singleCompany?.website || "",
      file: singleCompany?.file || null,
    })
  }, [singleCompany])

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-indigo-300";
  const labelClass = "block text-xs sm:text-sm font-medium text-gray-700 mb-1";

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      <Navbar />

      <div className='max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6'>

        {/* Back */}
        <button
          onClick={() => navigate('/recruiter/companies')}
          className='flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 hover:text-indigo-600 mb-4'
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className='bg-white border border-gray-100 rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-8'>

          <h1 className='text-lg sm:text-2xl font-bold text-gray-900'>Company Setup</h1>
          <p className='text-xs sm:text-sm text-gray-500 mt-0.5 mb-4 sm:mb-6'>Update your company details</p>

          <form onSubmit={submitHandler} className='flex flex-col gap-3 sm:gap-5'>

            <div>
              <label className={labelClass}>Company Name</label>
              <input
                type="text"
                name='name'
                value={input.name}
                onChange={changeHandler}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                rows={3}
                name='description'
                value={input.description}
                onChange={changeHandler}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  name='location'
                  value={input.location}
                  onChange={changeHandler}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Website</label>
                <input
                  type="text"
                  name='website'
                  value={input.website}
                  onChange={changeHandler}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Upload Logo</label>
              <input
                type="file"
                accept='image/*'
                onChange={fileChangeHandler}
                className='w-full border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm'
              />
            </div>

            <div className='flex gap-2 sm:gap-3 pt-1'>
              <Button
                type='button'
                onClick={() => navigate('/recruiter/companies')}
                variant='outline'
                className='rounded-lg sm:rounded-xl text-xs sm:text-sm py-2 px-3 sm:px-4'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={loading}
                className='bg-indigo-600 hover:bg-indigo-700 rounded-lg sm:rounded-xl text-xs sm:text-sm py-2 px-3 sm:px-4'
              >
                {loading ? "Updating..." : "Update Company"}
              </Button>
            </div>

          </form>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default CompanySetup