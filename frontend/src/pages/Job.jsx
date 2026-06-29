import React from 'react';
import { Bookmark, MapPin, Clock, Users, BadgeCheck, Briefcase, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSavedJob } from '@/redux/savedJobSlice';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const savedJobs = useSelector((store) => store.savedJob?.savedJobs) ?? [];
  const isSaved = savedJobs.some((savedJob) => savedJob._id === job._id);

  const handleSaveJob = () => {
    dispatch(toggleSavedJob(job));
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const isInternship = job?.jobType?.toLowerCase() === 'internship';
  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 hover:-translate-y-2 p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden">
      {/* Subtle top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isInternship ? 'bg-gradient-to-r from-indigo-400 to-purple-400' : 'bg-gradient-to-r from-emerald-400 to-teal-400'}`} />

      {/* Top Row */}
      <div className="flex items-center justify-between pt-1">
        <span className={`text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm ${
          isInternship
            ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100'
            : 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'
        }`}>
          {isInternship ? <Briefcase size={12} /> : <Zap size={12} />}
          {isInternship ? 'Internship' : 'Full-time Job'}
        </span>

        <button
          onClick={handleSaveJob}
          className={`p-2 rounded-full transition-all duration-300 active:scale-90 ${
            isSaved
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-gray-50 text-gray-400 hover:bg-indigo-50 hover:text-indigo-500 border border-gray-100'
          }`}
        >
          <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3">
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center text-lg font-bold border-2 ${
          isInternship
            ? 'bg-indigo-50 text-indigo-600 border-indigo-100'
            : 'bg-emerald-50 text-emerald-600 border-emerald-100'
        }`}>
          {job?.company?.name?.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1 truncate">
            {job?.company?.name}
            <BadgeCheck size={13} className="text-indigo-500 shrink-0" />
          </h3>
          <p className="text-[11px] text-gray-400 flex items-center gap-1">
            <MapPin size={10} />
            {job?.location || 'India'}
          </p>
        </div>
      </div>

      {/* Job Title */}
      <div>
        <h2 className="text-[15px] font-bold text-gray-900 line-clamp-1 leading-tight">
          {job?.title}
        </h2>
        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* Info Row */}
      <div className="flex items-center gap-4 text-[11px] text-gray-400">
        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
          <Users size={11} className="text-gray-400" />
          <span className="font-medium text-gray-600">{job?.position}</span> openings
        </span>
        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
          <Clock size={11} className="text-gray-400" />
          {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
        </span>
      </div>

      {/* Salary & Experience */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-50 rounded-xl px-3 py-2.5 flex flex-col gap-0.5">
          <span className="text-[10px] text-gray-400 font-medium">Salary</span>
          <span className="text-sm font-bold text-gray-800">₹{job?.salary}</span>
        </div>
        <div className={`rounded-xl px-3 py-2.5 flex flex-col gap-0.5 ${
          isInternship ? 'bg-indigo-50' : 'bg-emerald-50'
        }`}>
          <span className="text-[10px] text-gray-400 font-medium">Experience</span>
          <span className={`text-sm font-bold ${isInternship ? 'text-indigo-600' : 'text-emerald-600'}`}>
            {job?.experienceLevel} Year
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2.5 mt-1">
        <button
          onClick={() => navigate(`/jobdetail/${job?._id}`)}
          className="flex-1 bg-gray-900 text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-sm"
        >
          View Details
        </button>
        <button
          onClick={() => navigate(`/jobdetail/${job?._id}`)}
          className={`px-5 text-xs font-semibold py-2.5 rounded-xl border-2 transition-all duration-200 active:scale-[0.98] ${
            isInternship
              ? 'border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300'
              : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300'
          }`}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Job;