import React, { useState } from 'react'
import { Bookmark, MapPin, Clock, Users, BadgeCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const JobsSection = () => {

  const { alljobs } = useSelector(store => store.job);

  const [activeTab, setActiveTab] = useState("fresher");

  const navigate = useNavigate();

  const filteredJobs = alljobs.filter((job) => {
    if (activeTab === "internship") {
      return job?.jobType?.toLowerCase() === "internship";
    }
    return job?.experienceLevel === 0;
  });

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }

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

        {/* Jobs Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>

          {filteredJobs?.slice(0, 6).map((job, index) => (

            <div
              key={index}
              className='bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-3 sm:p-5 flex flex-col gap-2 sm:gap-3'
            >

              {/* Top */}
              <div className="flex items-center justify-between">

                <span
                  className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${activeTab === "fresher"
                      ? "bg-green-50 text-green-600"
                      : "bg-indigo-50 text-indigo-600"
                    }`}
                >
                  {activeTab === "fresher"
                    ? "🎓 Fresher"
                    : "💼 Internship"}
                </span>

                <button className="p-1.5 sm:p-2 rounded-full border border-gray-200 text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition">
                  <Bookmark size={12} />
                </button>

              </div>

              {/* Company */}
              <div className="flex items-center gap-2 sm:gap-3">

                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-indigo-50 flex items-center justify-center text-base sm:text-xl font-bold text-indigo-600 border border-indigo-100">
                  {job?.company?.name?.charAt(0)}
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1">

                    {job?.company?.name}

                    <BadgeCheck
                      size={12}
                      className="text-indigo-500"
                    />

                  </h3>

                  <p className="text-[10px] sm:text-xs text-gray-400">
                    India
                  </p>
                </div>

              </div>

              {/* Title */}
              <div>

                <h2 className="text-sm sm:text-base font-bold text-gray-900">
                  {job?.title}
                </h2>

                <p className="text-[10px] sm:text-xs text-gray-500 mt-1 line-clamp-2">
                  {job?.description}
                </p>

              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5">

                {job?.requirements?.[0] && (
                  <span className="text-[10px] sm:text-xs bg-gray-50 border border-gray-200 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded-lg">
                    {job?.requirements?.[0]}
                  </span>
                )}

                {job?.requirements?.[1] && (
                  <span className="text-[10px] sm:text-xs bg-gray-50 border border-gray-200 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded-lg">
                    {job?.requirements?.[1]}
                  </span>
                )}

                {job?.requirements?.[2] && (
                  <span className="text-[10px] sm:text-xs bg-gray-50 border border-gray-200 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded-lg">
                    {job?.requirements?.[2]}
                  </span>
                )}

              </div>

              {/* Info */}
              <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500">

                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {job?.location}
                </span>

                <span className="flex items-center gap-1">
                  <Users size={11} />
                  {job?.position}
                </span>

                <span className="flex items-center gap-1"><Clock size={11} />{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)}d ago`}</span>

              </div>

              {/* Salary */}
              <div className="flex items-center justify-between bg-gray-50 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2">

                <span className="text-[10px] sm:text-xs text-gray-500">
                  Salary
                </span>

                <span className="text-xs sm:text-sm font-bold text-indigo-600">
                  ₹{job?.salary}
                </span>

              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-1">

                <button
                  onClick={() => navigate(`/jobdetail/${job?._id}`)}
                  className="flex-1 bg-indigo-600 text-white text-xs sm:text-sm font-semibold py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:bg-indigo-700 transition"
                >
                  View Details
                </button>

                <button className="px-3 sm:px-4 text-xs sm:text-sm font-semibold py-1.5 sm:py-2 rounded-lg sm:rounded-xl border text-gray-500 border-gray-200 hover:border-indigo-300 transition">
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

export default JobsSection;

















// import React, { useState } from 'react'
// import { Bookmark, MapPin, Clock, Users, BadgeCheck } from 'lucide-react'
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const JobsSection = () => {

//   const { alljobs } = useSelector(store => store.job);

//   const [activeTab, setActiveTab] = useState("fresher");

//   const navigate = useNavigate();

//   // FILTER LOGIC
//   const filteredJobs = alljobs.filter((job) => {

//     // Internship jobs
//     if (activeTab === "internship") {
//       return job?.jobType?.toLowerCase() === "internship";
//     }

//     // Fresher jobs
//     return job?.experienceLevel === 0;
//   });

//   const daysAgoFunction = (mongodbTime) => {
//     const createdAt = new Date(mongodbTime);
//     const currentTime = new Date();
//     const timeDifference = currentTime - createdAt;
//     return Math.floor(timeDifference / (1000 * 60 * 60 * 24));

//   }

//   return (
//     <section className='py-14 bg-gray-100'>

//       <div className='max-w-5xl mx-auto px-4'>

//         {/* Heading */}
//         <div className='text-center mb-10'>
//           <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
//             Jobs for you
//           </h2>

//           <p className='text-gray-500 mt-2'>
//             Opportunities specially curated for freshers & interns
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className='flex justify-center mb-10'>

//           <div className='bg-white p-1 rounded-xl flex gap-1 border border-gray-200'>

//             <button
//               onClick={() => setActiveTab("fresher")}
//               className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === "fresher"
//                   ? "bg-indigo-600 text-white shadow"
//                   : "text-gray-600 hover:bg-gray-50"
//                 }`}
//             >
//               🎓 Fresher Jobs
//             </button>

//             <button
//               onClick={() => setActiveTab("internship")}
//               className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === "internship"
//                   ? "bg-indigo-600 text-white shadow"
//                   : "text-gray-600 hover:bg-gray-50"
//                 }`}
//             >
//               💼 Internship
//             </button>

//           </div>
//         </div>

//         {/* Jobs Grid */}
//         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>

//           {filteredJobs?.slice(0, 6).map((job, index) => (

//             <div
//               key={index}
//               className='bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col gap-3'
//             >

//               {/* Top */}
//               <div className="flex items-center justify-between">

//                 <span
//                   className={`text-xs font-semibold px-3 py-1 rounded-full ${activeTab === "fresher"
//                       ? "bg-green-50 text-green-600"
//                       : "bg-indigo-50 text-indigo-600"
//                     }`}
//                 >
//                   {activeTab === "fresher"
//                     ? "🎓 Fresher"
//                     : "💼 Internship"}
//                 </span>

//                 <button className="p-2 rounded-full border border-gray-200 text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition">
//                   <Bookmark size={14} />
//                 </button>

//               </div>

//               {/* Company */}
//               <div className="flex items-center gap-3">

//                 <div className="h-11 w-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl font-bold text-indigo-600 border border-indigo-100">
//                   {job?.company?.name?.charAt(0)}
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1">

//                     {job?.company?.name}

//                     <BadgeCheck
//                       size={13}
//                       className="text-indigo-500"
//                     />

//                   </h3>

//                   <p className="text-xs text-gray-400">
//                     India
//                   </p>
//                 </div>

//               </div>

//               {/* Title */}
//               <div>

//                 <h2 className="text-base font-bold text-gray-900">
//                   {job?.title}
//                 </h2>

//                 <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                   {job?.description}
//                 </p>

//               </div>

//               {/* Skills */}
//               <div className="flex flex-wrap gap-1.5">

//                 {job?.requirements?.[0] && (
//                   <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
//                     {job?.requirements?.[0]}
//                   </span>
//                 )}

//                 {job?.requirements?.[1] && (
//                   <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
//                     {job?.requirements?.[1]}
//                   </span>
//                 )}

//                 {job?.requirements?.[2] && (
//                   <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
//                     {job?.requirements?.[2]}
//                   </span>
//                 )}

//               </div>

//               {/* Info */}
//                 <div className="flex items-center justify-between text-xs text-gray-500">

//                 <span className="flex items-center gap-1">
//                   <MapPin size={12} />
//                   {job?.location}
//                 </span>

//                 <span className="flex items-center gap-1">
//                   <Users size={12} />
//                   {job?.position} openings
//                 </span>

//                 <span className="flex items-center gap-1"><Clock size={12} />{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</span>

//               </div>

//               {/* Salary */}
//               <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">

//                 <span className="text-xs text-gray-500">
//                   Salary
//                 </span>

//                 <span className="text-sm font-bold text-indigo-600">
//                   ₹{job?.salary}
//                 </span>

//               </div>

//               {/* Buttons */}
//               <div className="flex gap-2 mt-1">

//                 <button
//                   onClick={() => navigate(`/jobdetail/${job?._id}`)}
//                   className="flex-1 bg-indigo-600 text-white text-sm font-semibold py-2 rounded-xl hover:bg-indigo-700 transition"
//                 >
//                   View Details
//                 </button>

//                 <button className="px-4 text-sm font-semibold py-2 rounded-xl border text-gray-500 border-gray-200 hover:border-indigo-300 transition">
//                   Save
//                 </button>

//               </div>

//             </div>

//           ))}

//         </div>

//       </div>

//     </section>
//   )
// }

// export default JobsSection;