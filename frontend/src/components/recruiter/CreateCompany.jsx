import React, { useState } from 'react'
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import BottomNav from '../shared/BottomNav';

const CreateCompany = () => {

  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const registerNewCompany = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      if (res?.data?.success) {
        dispatch(setSingleCompany(res?.data?.company));
        toast.success(res?.data?.message);
        navigate(`/recruiter/companies/${res?.data?.company._id}`);
      }
    } catch (error) {
      toast.error('Failed to register company');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      <Navbar />

      <div className='px-3 sm:px-6 py-4 sm:py-6'>
        <div className='max-w-3xl mx-auto'>

          {/* Header */}
          <div className="mb-4">
            <h1 className='text-lg sm:text-xl font-bold text-gray-900'>Add Your Company</h1>
            <p className='text-xs sm:text-sm text-gray-500 mt-0.5'>Enter your company information to start posting and managing jobs.</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4">Company Details</h2>

            <form onSubmit={registerNewCompany} className='flex flex-col gap-3'>
              <div className='flex flex-col gap-1'>
                <label className='text-xs sm:text-sm font-medium text-gray-700'>Company Name</label>
                <input
                  type="text"
                  name='companyName'
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder='Enter your Company'
                  className='border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 w-full'
                  required
                />
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full bg-indigo-600 text-white text-xs sm:text-sm font-semibold py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-1'
              >
                {loading ? "Registering..." : "Register Company"}
              </button>
            </form>
          </div>

        </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default CreateCompany;