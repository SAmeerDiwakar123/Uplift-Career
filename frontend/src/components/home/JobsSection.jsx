import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import JobCard from '../job/JobCard'

const JobsSection = () => {

  const { alljobs } = useSelector(store => store.job);
  const [activeTab, setActiveTab] = useState("fresher");

  const filteredJobs = alljobs?.filter((job) => {
    if (activeTab === "internship") {
      return job?.jobType?.toLowerCase() === "internship";
    }
    return job?.experienceLevel === "Fresher (0-1 yr)";
  }) || [];

  const displayJobs = filteredJobs.slice(0, 3);

  return (
    <section className='py-8 sm:py-12 bg-gray-100'>
      <div className='max-w-7xl mx-auto px-4'>

        {/* Heading */}
        <div className='text-center mb-6'>
          <h2 className='text-lg sm:text-2xl font-bold text-gray-900'>
            Jobs for you
          </h2>
          <p className='text-sm text-gray-500 mt-1'>
            Opportunities specially curated for freshers & interns
          </p>
        </div>

        {/* Tabs */}
        <div className='flex justify-center mb-6'>
          <div className='bg-white p-1 rounded-lg flex gap-1 border border-gray-200 shadow-sm'>
            <button
              onClick={() => setActiveTab("fresher")}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-md font-medium text-xs sm:text-sm transition-all duration-200 ${
                activeTab === "fresher"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Fresher Jobs
            </button>
            <button
              onClick={() => setActiveTab("internship")}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-md font-medium text-xs sm:text-sm transition-all duration-200 ${
                activeTab === "internship"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Internship
            </button>
          </div>
        </div>

        {/* Jobs Grid */}
        {alljobs.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {alljobs.slice(0, 4).map((job) => (
              <JobCard key={job._id} job={job}/>
            ))}
          </div>
        ) : (
          <div className='text-center py-10'>
            <p className='text-sm text-gray-400'>No jobs available in this category</p>
          </div>
        )}

      </div>
    </section>
  )
}

export default JobsSection;





// import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
// import JobCard from '../job/JobCard'

// const JobsSection = () => {

//   const { alljobs } = useSelector(store => store.job);
//   const [activeTab, setActiveTab] = useState("fresher");

//   const filter = alljobs.filter((job) => {
//     if (activeTab === "internship") {
//       return job?.jobType?.toLowerCase() === "internship";
//     }
//     return job?.experienceLevel === "Fresher (0-1 yr)";
//   });
//   return (
//     <section className='py-8 sm:py-14 bg-gray-100'>

//       <div className='max-w-5xl mx-auto px-4'>

//         {/* Heading */}
//         <div className='text-center mb-6 sm:mb-10'>
//           <h2 className='text-xl sm:text-3xl md:text-4xl font-bold text-gray-900'>
//             Jobs for you
//           </h2>

//           <p className='text-xs sm:text-base text-gray-500 mt-1 sm:mt-2'>
//             Opportunities specially curated for freshers & interns
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className='flex justify-center mb-6 sm:mb-10'>

//           <div className='bg-white p-1 rounded-lg sm:rounded-xl flex gap-1 border border-gray-200'>

//             <button
//               onClick={() => setActiveTab("fresher")}
//               className={`px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-md sm:rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 ${activeTab === "fresher"
//                   ? "bg-indigo-600 text-white shadow"
//                   : "text-gray-600 hover:bg-gray-50"
//                 }`}
//             >
//               🎓 Fresher Jobs
//             </button>

//             <button
//               onClick={() => setActiveTab("internship")}
//               className={`px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-md sm:rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 ${activeTab === "internship"
//                   ? "bg-indigo-600 text-white shadow"
//                   : "text-gray-600 hover:bg-gray-50"
//                 }`}
//             >
//               💼 Internship
//             </button>

//           </div>
//         </div>

//         <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4'>
//           {alljobs.slice(0, 3).map((job) => (
//             <JobCard key={job._id} job={job}/>
//           ))}
//         </div>

//       </div>

//     </section>
//   )
// }

// export default JobsSection;