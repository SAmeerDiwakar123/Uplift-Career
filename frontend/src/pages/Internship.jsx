
import React from "react";
import Navbar from "../components/shared/Navbar";
import BottomNav from "@/components/shared/BottomNav";
import { useSelector } from "react-redux";
import Job from "./Job";

const Internship = () => {
  const { alljobs } = useSelector((store) => store.job);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-4 mt-6 flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          💼 Internships
        </h1>

        <p className="text-sm text-gray-500 mt-1 mb-6">
          Find the best internships for you
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-24">
          {alljobs?.filter((job) => job?.jobType?.toLowerCase() === "internship").map((job)=> (
            <Job key={job._id} job={job} />
          ))}
        </div>

        {alljobs?.filter(
          (job) => job?.jobType?.toLowerCase() === "internship"
        ).length === 0 && (
          <div className="bg-white rounded-xl border p-8 text-center">
            <h2 className="text-lg font-semibold text-gray-700">
              No internships found
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Please check again later.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Internship;


// // Internship.jsx
// import React from 'react';
// import Navbar from '../components/shared/Navbar';
// import Footer from '../components/shared/Footer';
// import { Bookmark, MapPin, Clock, Users, BadgeCheck } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import BottomNav from '@/components/shared/BottomNav';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const Internship = () => {

//   const {alljobs} = useSelector(store => store.job);
//   const navigate = useNavigate();
//     // const jobId = "dbshbhsdhdbn"

//     const daysAgoFunction = (mongodbTime) => {
//       const createdAt = new Date(mongodbTime);
//       const currentTime = new Date();
//       const timeDifference = currentTime - createdAt;
//       return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//     }

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Navbar />

//       <div className="max-w-6xl mx-auto px-4 mt-6 flex-1 w-full">

//         <h1 className="text-sm sm:text-3xl font-bold text-gray-900"> 💼 Internships</h1>
//         <p className="text-sm text-gray-400 mb-6">Find the best internships for you</p>

//         <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">

//           {alljobs?.filter((job) => job?.jobType?.toLowerCase() === "internship")?.slice(0,10).map((job) => (
//             <div
//               key={job._id}
//               className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col gap-3"
//             >

//               <div className="flex items-center justify-between">
//             <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-3 py-1 rounded-full">
//               💼 {job?.jobType}
//             </span>

//                 <button className="p-2 rounded-full border border-gray-200 text-gray-400">
//                   <Bookmark size={14} />
//                 </button>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="h-11 w-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl font-bold text-indigo-600">
//                   {job?.company?.name?.charAt(0)}
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1">
//                     {job?.company?.name}
//                     <BadgeCheck size={13} className="text-indigo-500" />
//                   </h3>

//                   <p className="text-xs text-gray-400">
//                     {job?.location}
//                   </p>
//                 </div>
//               </div>

//               <div>
//                 <h2 className="text-base font-bold text-gray-900">
//                   {job?.title}
//                 </h2>

//                 <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                   {job?.description}
//                 </p>
//               </div>

//               <div className="flex items-center justify-between text-xs text-gray-500">
//                 <span className="flex items-center gap-1">
//                   <MapPin size={12} />
//                   {job?.location}
//                 </span>
//                 <span className="flex items-center gap-1"><Users size={12} />{job?.applicants} applicants</span>

//                 <span className="flex items-center gap-1">
//                   <Clock size={12} />
//                   {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
//                 <span className="text-xs text-gray-500">₹{job?.salary}</span>
//                 {/* 
//                 <span className="text-sm font-bold text-indigo-600">
//                   ₹{job?.salary}
//                 </span> */}
//               </div>

//               <div className="flex gap-2 mt-1">
//                 <button
//                   onClick={() => navigate(`/jobdetail/${job?._id}`)}
//                   className="flex-1 bg-indigo-600 text-white text-sm font-semibold py-2 rounded-xl"
//                 >
//                   View Details
//                 </button>

//                 <button className="px-4 text-sm font-semibold py-2 rounded-xl border">
//                   Save
//                 </button>
//               </div>

//             </div>
//           ))}

//         </div>
//       </div>
//       <BottomNav/>
//     </div>
//   );
// };

// export default Internship;