import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import JobCard from '../job/JobCard'

const JobsSection = () => {

  const { alljobs } = useSelector(store => store.job);
  const [activeTab, setActiveTab] = useState("fresher");

  const filteredJobs = alljobs.filter((job) => {
    if (activeTab === "internship") {
      return job?.jobType?.toLowerCase() === "internship";
    }
    console.log(alljobs[0].experienceLevel);
    return job?.experienceLevel === 1;
  });

  return (
    <section className='py-8 sm:py-14 bg-gray-100'>

      <div className='max-w-5xl mx-auto px-4'>

        {/* Heading */}
        <div className='text-center mb-6 sm:mb-10'>
          <h2 className='text-xl sm:text-3xl md:text-4xl font-bold text-gray-900'>
            Jobs for you
          </h2>

          <p className='text-xs sm:text-base text-gray-500 mt-1 sm:mt-2'>
            Opportunities specially curated for freshers & interns
          </p>
        </div>

        {/* Tabs */}
        <div className='flex justify-center mb-6 sm:mb-10'>

          <div className='bg-white p-1 rounded-lg sm:rounded-xl flex gap-1 border border-gray-200'>

            <button
              onClick={() => setActiveTab("fresher")}
              className={`px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-md sm:rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 ${activeTab === "fresher"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              🎓 Fresher Jobs
            </button>

            <button
              onClick={() => setActiveTab("internship")}
              className={`px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-md sm:rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 ${activeTab === "internship"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              💼 Internship
            </button>

          </div>
        </div>

        <div className="grid grid-cols-1">
  {filteredJobs.map((job) => (
    <h1 key={job._id} className="text-red-500 text-2xl">
      {job.title}
    </h1>
  ))}
</div>

      </div>

    </section>
  )
}

export default JobsSection;