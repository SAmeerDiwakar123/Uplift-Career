import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Plus } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../ui/button'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { useSelector } from 'react-redux'
import useGetCompanyByid from '@/hooks/useGetCompanyByid'

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

  const fileChangeHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0]
    })
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("website", input.website);

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        withCredentials: true,
      })

      if (res.data.success) {
        toast.success("Company updated successfully");
        navigate('/admin/companies');
      }
    } catch (error) {
      console.log(error);
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

  return (
    <div className='min-h-screen bg-gray-50'>

      <Navbar />

      <div className='max-w-4xl mx-auto p-6'>

        {/* Back Button */}

        <button
          onClick={() => navigate('/admin/companies')}
          className='flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 mb-5'
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className='bg-white border rounded-2xl shadow-sm p-8'>

          <h1 className='text-2xl font-bold text-gray-900'>
            Company Setup
          </h1>

          <p className='text-sm text-gray-500 mt-1 mb-6'>
            Update your company details
          </p>

          <form onSubmit={submitHandler} className='space-y-5'>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Company Name
              </label>

              <input
                type="text"
                name='name'
                value={input.name}
                onChange={changeHandler}
                className='w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-300'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Description
              </label>

              <textarea
                rows={4}
                name='description'
                value={input.description}
                onChange={changeHandler}
                className='w-full border rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-indigo-300'
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>

              <div>
                <label className='block text-sm font-medium mb-2'>
                  Location
                </label>

                <input
                  type="text"
                  name='location'
                  value={input.location}
                  onChange={changeHandler}
                  className='w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-300'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-2'>
                  Website
                </label>

                <input
                  type="text"
                  name='website'
                  value={input.website}
                  onChange={changeHandler}
                  className='w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-300'
                />
              </div>

            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Upload Logo
              </label>

              <input
                type="file"
                accept='image/*'
                onChange={fileChangeHandler}
                className='w-full border rounded-xl px-4 py-3'
              />
            </div>

            <div className='flex gap-3 pt-2'>

              <Button
                type='button'
                onClick={() => navigate('/admin/companies')}
                variant='outline'
                className='rounded-xl'
              >
                Cancel
              </Button>

              <Button
                type='submit'
                disabled={loading}
                className='bg-indigo-600 hover:bg-indigo-700 rounded-xl'
              >
                {loading ? "Updating..." : "Update Company"}
              </Button>

            </div>

          </form>

        </div>

      </div>

    </div>
  )
}

export default CompanySetup