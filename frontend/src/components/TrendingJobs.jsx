import JobDetail from '@/pages/JobDetail';
import { BadgeCheck, Bookmark, Clock, MapPin, User, Users, IndianRupee } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from './shared/Footer';
import { useSelector } from 'react-redux';

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const TrendingJobs = () => {

  const { alljobs } = useSelector(store => store.job);
  const navigate = useNavigate();
  const trendingJobs = jobsArray.slice(0, 6);
  // const jobId = "dbshbhsdhdbn"

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60* 60 * 24));
  }

  return (
    <section className='py-16 bg-gray-100'>
      <div className='max-w-5xl mx-auto px-4'>

        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-900'>🔥 Trending Jobs</h2>
          <button onClick={() => navigate('/jobs')} className='text-indigo-600 font-medium hover:underline'>View All →</button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>

          {alljobs.slice(0, 6).map((job, index) => (
            <div key={index} className='bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col gap-3'>
              <div className="flex items-center justify-between">
                <span className='text-xs bg-red-50 text-red-500 font-semibold px-3 py-1 rounded-full'>🔥 Trending</span>

                <button className='p-2 rounded-full border border-gray-200 text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition'>
                  <Bookmark size={14} />
                </button>
              </div>

              <div className='flex items-center gap-3'>
                <div className='h-11 w-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl font-bold text-indigo-600 border border-indigo-100'>
                  {job?.company?.name?.charAt(0)}
                </div>

                <div>
                  <h3 className='text-sm font-bold text-gray-800 flex items-center gap-1'>
                    {job?.company?.name}
                    <BadgeCheck size={13} className="text-indigo-500" />
                  </h3>
                  <p className='text-xs text-gray-400'>India</p>
                </div>
              </div>

              <div>
                <h2 className='text-base font-bold text-gray-900'>{job?.title}</h2>
                <p className='text-xs text-gray-500 mt-1 line-clamp-2'>{job?.description}</p>
              </div>

              <div className='flex flex-wrap gap-1.5'>
                <span className='text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg'>{job?.requirements?.[0]}</span>
                <span className='text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg'>{job?.requirements?.[1]}</span>
                <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">{job?.requirements?.[2]}</span>
              </div>

              <div className='flex items-center justify-between text-xs text-gray-500'>
                <span className='flex items-center gap-1'><MapPin size={12} />{job?.location}</span>
                <span className='flex items-center gap-1'><Users size={12} />{job?.applicants} applicants</span>
                <span className='flex items-center gap-1'><Clock size={12} />{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago` }</span>
              </div>

              <div className='flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2'>

                <span className='flex items-center gap-1 text-xs text-gray-500'>
                  <IndianRupee size={12} />
                  {job?.salary}
                </span>

                <span className='text-sm font-bold text-indigo-600'>
                  {job?.jobType}
                </span>

              </div>

              <div className="flex gap-2 mt-1">
                <button onClick={() => navigate(`/jobdetail/${job?._id}`)} className="flex-1 bg-indigo-600 text-white text-sm font-semibold py-2 rounded-xl hover:bg-indigo-700 transition">
                  View Details
                </button>
                <button className="px-4 text-sm font-semibold py-2 rounded-xl border text-gray-500 border-gray-200 hover:border-indigo-300 transition">
                  Save
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingJobs