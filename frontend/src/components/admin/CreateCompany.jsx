import React, { useState } from 'react'
import Navbar from '../shared/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';



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
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if (res?.data?.success) {
        dispatch(setSingleCompany(res?.data?.company));
        toast.success(res?.data?.message);
        const companyId = res?.data?.company._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to register company');
    }
    finally {
      setLoading(false);
    }
  }


  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className='p-6'>
        <div className='max-w-3xl mx-auto'>

          <div>
            <h1 className='text-xl font-bold '>Add Your Company</h1>
            <p className='text-sm font-medium items-center pt-1'>Enter your company information to start posting and managing jobs.</p>
          </div>

          <Card className="border border-gray-100 shadow-sm mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-gray-800">
                Company
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={registerNewCompany} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                  <label className='text-sm font-medium text-gray-700'>Company Name</label>
                  <input
                    type="text"
                    name='companyName'
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder='Enter your Company'
                    className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-indigo-300'
                    required
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <button
                    type='submit'
                    disabled={loading}
                    className='flex-1 bg-indigo-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {loading ? "Registering..." : "Register Company"}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
export default CreateCompany;