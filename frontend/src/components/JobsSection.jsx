import React, { useState } from 'react'
import { Bookmark, MapPin, Clock, Users, BadgeCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const JobsSection = () => {

  const { alljobs } = useSelector(store => store.job);

  const [activeTab, setActiveTab] = useState("fresher");

  const navigate = useNavigate();

  // FILTER LOGIC
  const filteredJobs = alljobs.filter((job) => {

    // Internship jobs
    if (activeTab === "internship") {
      return job?.jobType?.toLowerCase() === "internship";
    }

    // Fresher jobs
    return job?.experienceLevel === 0;
  });

  return (
    <section className='py-14 bg-gray-100'>

      <div className='max-w-5xl mx-auto px-4'>

        {/* Heading */}
        <div className='text-center mb-10'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
            Jobs for you
          </h2>

          <p className='text-gray-500 mt-2'>
            Opportunities specially curated for freshers & interns
          </p>
        </div>

        {/* Tabs */}
        <div className='flex justify-center mb-10'>

          <div className='bg-white p-1 rounded-xl flex gap-1 border border-gray-200'>

            <button
              onClick={() => setActiveTab("fresher")}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                activeTab === "fresher"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              🎓 Fresher Jobs
            </button>

            <button
              onClick={() => setActiveTab("internship")}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                activeTab === "internship"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              💼 Internship
            </button>

          </div>
        </div>

        {/* Jobs Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>

          {filteredJobs?.slice(0, 6).map((job, index) => (

            <div
              key={index}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col gap-3'
            >

              {/* Top */}
              <div className="flex items-center justify-between">

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    activeTab === "fresher"
                      ? "bg-green-50 text-green-600"
                      : "bg-indigo-50 text-indigo-600"
                  }`}
                >
                  {activeTab === "fresher"
                    ? "🎓 Fresher"
                    : "💼 Internship"}
                </span>

                <button className="p-2 rounded-full border border-gray-200 text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition">
                  <Bookmark size={14} />
                </button>

              </div>

              {/* Company */}
              <div className="flex items-center gap-3">

                <div className="h-11 w-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl font-bold text-indigo-600 border border-indigo-100">
                  {job?.company?.name?.charAt(0)}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1">

                    {job?.company?.name}

                    <BadgeCheck
                      size={13}
                      className="text-indigo-500"
                    />

                  </h3>

                  <p className="text-xs text-gray-400">
                    India
                  </p>
                </div>

              </div>

              {/* Title */}
              <div>

                <h2 className="text-base font-bold text-gray-900">
                  {job?.title}
                </h2>

                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {job?.description}
                </p>

              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">

                {job?.requirements?.[0] && (
                  <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
                    {job?.requirements?.[0]}
                  </span>
                )}

                {job?.requirements?.[1] && (
                  <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
                    {job?.requirements?.[1]}
                  </span>
                )}

                {job?.requirements?.[2] && (
                  <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
                    {job?.requirements?.[2]}
                  </span>
                )}

              </div>

              {/* Info */}
              <div className="flex items-center justify-between text-xs text-gray-500">

                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {job?.location}
                </span>

                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {job?.position} openings
                </span>

                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {job?.createdAt?.split("T")[0]}
                </span>

              </div>

              {/* Salary */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">

                <span className="text-xs text-gray-500">
                  Salary
                </span>

                <span className="text-sm font-bold text-indigo-600">
                  ₹{job?.salary}
                </span>

              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-1">

                <button
                  onClick={() => navigate(`/jobdetail/${job?._id}`)}
                  className="flex-1 bg-indigo-600 text-white text-sm font-semibold py-2 rounded-xl hover:bg-indigo-700 transition"
                >
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

export default JobsSection;




// import React, { useState } from 'react'
// import { Bookmark, MapPin, Clock, Users, BadgeCheck } from 'lucide-react'
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const JobsSection = () => {

//   const { alljobs } = useSelector(store => store.job);

//   const [activeTab, setActiveTab] = useState("fresher");
//   const navigate = useNavigate();
//   const jobId = "dhsbhjsdbfdj"

//   return (
//     <section className='py-14 bg-gray-100'>
//       <div className='max-w-5xl mx-auto px-4'>

//         <div className='text-center mb-10'>
//           <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>Jobs for you</h2>
//           <p className='text-gray-500 mt-2'>Opportunities specially curated for freshers & interns</p>
//         </div>

//         <div className='flex justify-center mb-10'>
//           <div className='bg-white p-1 rounded-xl flex gap-1 border border-gray-200'>
//             <button
//               onClick={() => setActiveTab("fresher")}
//               className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === "fresher" ? "bg-indigo-600 text-white shadow" : "text-gray-600 hover:bg-gray-50"}`}>
//               🎓 Fresher Jobs
//             </button>
//             <button
//               onClick={() => setActiveTab("internship")}
//               className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === "internship" ? "bg-indigo-600 text-white shadow" : "text-gray-600 hover:bg-gray-50"}`}>
//               💼 Internship
//             </button>
//           </div>
//         </div>

//         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
//           {alljobs.slice(0, 6).map((job, index) => (
//             <div key={index} className='bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col gap-3'>

//               <div className="flex items-center justify-between">
//                 <span className={`text-xs font-semibold px-3 py-1 rounded-full ${activeTab === "fresher" ? "bg-green-50 text-green-600" : "bg-indigo-50 text-indigo-600"}`}>
//                   {activeTab === "fresher" ? "🎓 Fresher" : "💼 Internship"}
//                 </span>
//                 <button className="p-2 rounded-full border border-gray-200 text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition">
//                   <Bookmark size={14} />
//                 </button>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="h-11 w-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl font-bold text-indigo-600 border border-indigo-100">
//                   {job?.company?.name?.charAt(0)}
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1">
//                     {job?.company?.name}
//                     <BadgeCheck size={13} className="text-indigo-500" />
//                   </h3>
//                   <p className="text-xs text-gray-400">India</p>
//                 </div>
//               </div>

//               <div>
//                 <h2 className="text-base font-bold text-gray-900">{job?.jobType}</h2>
//                 <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                   {job?.description}
//                 </p>
//               </div>

//               <div className="flex flex-wrap gap-1.5">
//                 <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">{job?.requirements?.[0]}</span>
//                 <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">{job?.requirements?.[1]}</span>
//                 <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">{job?.requirements?.[2]}</span>
//               </div>

//               <div className="flex items-center justify-between text-xs text-gray-500">
//                 <span className="flex items-center gap-1"><MapPin size={12} />{job?.location}</span>
//                 <span className="flex items-center gap-1"><Users size={12} />{job?.applicants} applicants</span>
//                 <span className="flex items-center gap-1"><Clock size={12} />{job?.position} days ago</span>
//               </div>

//               <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
//                 <span className="text-xs text-gray-500">Salary</span>
//                 <span className="text-sm font-bold text-indigo-600">₹{job?.salary}</span>
//               </div>

//               <div className="flex gap-2 mt-1">
//                 <button onClick={() => navigate(`/jobdetail/${jobId}`)} className="flex-1 bg-indigo-600 text-white text-sm font-semibold py-2 rounded-xl hover:bg-indigo-700 transition">
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