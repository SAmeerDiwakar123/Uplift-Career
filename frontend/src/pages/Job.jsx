import React from 'react';
import {
  Bookmark,
  MapPin,
  Clock,
  Users,
  BadgeCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSavedJob } from '@/redux/savedJobSlice';

const Job = ({ job }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const savedJobs =
    useSelector((store) => store.savedJob?.savedJobs) ?? [];

  const isSaved = savedJobs.some(
    (savedJob) => savedJob._id === job._id
  );

  const handleSaveJob = () => {
    dispatch(toggleSavedJob(job));
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;

    return Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-3 sm:p-5 flex flex-col gap-2 sm:gap-3">

      {/* Top */}
      <div className="flex items-center justify-between">

        <span
          className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${
            job?.jobType?.toLowerCase() === 'internship'
              ? 'bg-indigo-50 text-indigo-600'
              : 'bg-green-50 text-green-600'
          }`}
        >
          {job?.jobType?.toLowerCase() === 'internship'
            ? '💼 Internship'
            : '🎓 Job'}
        </span>

        <button
          onClick={handleSaveJob}
          className={`p-1.5 sm:p-2 rounded-full border transition ${
            isSaved
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'border-gray-200 text-gray-400 hover:border-indigo-400 hover:text-indigo-500'
          }`}
        >
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

        <h2 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
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
          {job?.position} openings
        </span>

        <span className="flex items-center gap-1">
          <Clock size={11} />
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)}d ago`}
        </span>

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

      {/* Experience */}
      <div className="flex items-center justify-between bg-indigo-50 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2">

        <span className="text-[10px] sm:text-xs text-gray-500">
          Experience
        </span>

        <span className="text-xs sm:text-sm font-bold text-indigo-600">
          {job?.experienceLevel} Year
        </span>

      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-1">

        <button
          onClick={() =>
            navigate(`/jobdetail/${job?._id}`)
          }
          className="flex-1 bg-indigo-600 text-white text-xs sm:text-sm font-semibold py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:bg-indigo-700 transition"
        >
          View Details
        </button>

        <button
          onClick={() =>
            navigate(`/jobdetail/${job?._id}`)
          }
          className="px-3 sm:px-4 text-xs sm:text-sm font-semibold py-1.5 sm:py-2 rounded-lg sm:rounded-xl border text-gray-500 border-gray-200 hover:border-indigo-300 transition"
        >
          Apply
        </button>

      </div>

    </div>
  );
};

export default Job;



// // Job.jsx
  // import React from 'react';
  // import { Bookmark, MapPin, Clock, Users, BadgeCheck, IndianRupee } from 'lucide-react';
  // import { useNavigate } from 'react-router-dom';
  // import { useDispatch, useSelector } from 'react-redux';
  // import { toggleSavedJob } from '@/redux/savedJobSlice';


  // const Job = ({ job }) => {

  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();
  //   const savedJobs = useSelector(store => store.savedJob?.savedJobs) ?? [];
  //   const isSaved = savedJobs.some(savedJob => savedJob._id === job._id);


  //   const handleSaveJob = () => {
  //     dispatch(toggleSavedJob(job));
  //   }

  //   const daysAgoFunction = (mongodbTime) => {
  //     const createdAt = new Date(mongodbTime);
  //     const currentTime = new Date();
  //     const timeDifference = currentTime - createdAt;
  //     return Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  //   }

  //   return (
  //     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col gap-3">

  //       {/* Top Row */}
  //       <div className="flex items-center justify-between">
  //         <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-3 py-1 rounded-full">
  //           {job?.jobType}
  //         </span>
          
  //         <button onClick={handleSaveJob}
  //           className={`p-2 rounded-lg ${isSaved ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-500'} hover:bg-indigo-600 hover:text-white transition`}>
  //           <Bookmark size={14} />
  //         </button>
  //       </div>

  //       {/* Company Info */}
  //       <div className="flex items-center gap-3">
  //         <div className="h-11 w-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl font-bold text-indigo-600 border border-indigo-100">
  //           {job?.company?.name?.charAt(0)}
  //         </div>
  //         <div>
  //           <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1">
  //             {job?.company?.name}
  //             <BadgeCheck size={13} className="text-indigo-500" />
  //           </h3>
  //           <p className="text-xs text-gray-400">India</p>
  //         </div>
  //       </div>

  //       {/* Job Title */}
  //       <div>
  //         <h2 className="text-base font-bold text-gray-900">{job?.title}</h2>
  //         <p className="text-xs text-gray-500 mt-1 line-clamp-2">
  //           {job?.description}
  //         </p>
  //       </div>

  //       {/* Skills */}
  //       <div className="flex flex-wrap gap-1.5">
  //         <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">{job?.requirements?.[0]}</span>
  //         <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">{job?.requirements?.[1]}</span>
  //         <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">{job?.requirements?.[2]}</span>
  //       </div>

  //       {/* Meta Info */}
  //       <div className="flex items-center justify-between text-xs text-gray-500">
  //         <span className="flex items-center gap-1"><MapPin size={12} />{job?.location}</span>
  //         <span className="flex items-center gap-1"><Users size={12} />{job?.position} position</span>
  //         <span className="flex items-center gap-1"><Clock size={12} />{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</span>
  //       </div>

  //       {/* Salary */}
  //       <div className='flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2'>

  //         <span className='flex items-center gap-1 text-xs text-gray-500'>
  //           <IndianRupee size={12} />
  //           {job?.salary}
  //         </span>

  //         <span className='text-sm font-bold text-indigo-600'>
  //           experience: {job?.experienceLevel} 
  //         </span>

  //       </div>
  //       {/* Buttons */}
  //       <div className="flex gap-2 mt-1">
  //         <button onClick={() => navigate(`/jobdetail/${job?._id}`)} className="flex-1 bg-indigo-600 text-white text-sm font-semibold py-2 rounded-xl hover:bg-indigo-700 transition">
  //           View Details
  //         </button>
  //         <button className="px-4 text-sm font-semibold py-2 rounded-xl border text-gray-500 border-gray-200 hover:border-indigo-300 transition">
  //           Apply
  //         </button>
  //       </div>

  //     </div>
  //   );
  // };

  // export default Job;