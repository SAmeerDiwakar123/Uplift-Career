import React, { useEffect } from 'react'
import Navbar from '../../components/shared/Navbar'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplications } from '@/redux/applicationSlice'
import { Search } from 'lucide-react'
import { toast } from 'sonner'
import BottomNav from '../../components/shared/BottomNav'
const Applicants = () => {

  const params = useParams();
  const dispatch = useDispatch();

  const { applicants } = useSelector(store => store.application);

  useEffect(() => {

    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllApplications(res.data.job.applications));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllApplicants();
  }, [])

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status}, {withCredentials: true});
      if(res.data.success){
        toast.success("Application status updated successfully");
      }
    } catch (error) {
      toast .error("Something went wrong while updating application status");
    }
  }



  return (
    <div className='min-h-screen bg-gray-50'>

      <Navbar />

      <div className='max-w-6xl mx-auto p-6'>

        <div className='flex items-center justify-between mb-6'>

          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Applicants</h1>
            <p className='text-xs font-medium text-gray-700'>Manage all applicants</p>
          </div>
        </div>

        <div className='relative mb-4'>
          <Search size={15} className='absolute left-3 top-3 text-gray-400'/>
          <input type="text" placeholder='Search applicant' className='w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white'/>
        </div>

        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-gray-100'>
                <th className='text-left py-3 px-4 text-xs font-semibold text-gray-800'>#</th>

                <th className='text-left py-3 px-4 text-xs font-semibold text-gray-800'>Candidate</th>

                <th className='text-left py-3 px-4 text-xs font-semibold text-gray-800'>Email</th>

                <th className='text-left py-3 px-4 text-xs font-semibold text-gray-800'>Phone</th>

                <th className='text-left py-3 px-4 text-xs font-semibold text-gray-800'>
                  Resume
                </th>

                <th className='text-left py-3 px-4 text-xs font-semibold text-gray-800'>
                  Status
                </th>

                <th className='text-left py-3 px-4 text-xs font-semibold text-gray-800'>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {applicants?.map((item, index) => (

                <tr
                  key={item._id}
                  className='border-b border-gray-50 hover:bg-gray-50 transition'
                >

                  <td className='py-3 px-4'>
                    {index + 1}
                  </td>

                  <td className='py-3 px-4'>

                    <div className='flex items-center gap-3'>

                      <div className='w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold'>{item?.applicant?. fullname?.charAt(0)}
                      </div>

                      <div>

                        <h2 className='font-medium text-gray-900'>
                          {item?.applicant?.fullname}
                        </h2>

                      </div>

                    </div>

                  </td>

                  <td className='py-3 px-4'>
                    {item?.applicant?.email}
                  </td>

                  <td className='py-3 px-4'>
                    {item?.applicant?.phoneNumber}
                  </td>

                  <td className='py-3 px-4'>

                    <a
                      href={
                        item?.applicant
                          ?.profile?.resume
                      }
                      target='_blank'
                      rel='noreferrer'
                      className='text-indigo-600 hover:underline'
                    >
                      View Resume
                    </a>

                  </td>

                  <td className='py-3 px-4'>

                    <span className={`
                 text-xs font-semibold capitalize px-3 py-1 rounded-full
                 ${item?.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : item?.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                `}>

                      {item?.status}

                    </span>

                  </td>

                  <td className='py-3 px-4'>

                    <div className='flex gap-2'>

                      <button                     onClick={() => statusHandler("accepted", item._id)} 
                        className='p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-500 hover:text-white transition'
                      >
                        Accept
                      </button>

                      <button onClick={() => statusHandler("rejected", item._id)}
                        className='p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition'
                      >
                        Reject
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
              <BottomNav/>
    </div>
  )
}

export default Applicants