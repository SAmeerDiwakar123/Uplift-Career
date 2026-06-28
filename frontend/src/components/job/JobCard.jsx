import React from 'react';
import { Bookmark, MapPin, Clock, Users, BadgeCheck, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSavedJob } from '@/redux/savedJobSlice';
import { toast } from 'sonner';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const savedJobs = useSelector((store) => store.savedJob?.savedJobs) ?? [];
  const { user } = useSelector((store) => store.auth);

  const isSaved = savedJobs.some((savedJob) => savedJob._id === job._id);

  const handleSaveJob = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to save jobs');
      return;
    }
    dispatch(toggleSavedJob(job));
    toast.success(isSaved ? 'Removed from saved' : 'Saved successfully!');
  };

  const handleViewDetails = () => {
    navigate(`/jobdetail/${job._id}`);
  };

  const handleApply = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to apply');
      return;
    }
    navigate(`/jobdetail/${job._id}#apply`);
  };

  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return 'Recently';
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return `${Math.floor(days / 30)}m ago`;
  };

  return (
    <div 
      onClick={handleViewDetails}
      className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col gap-3 cursor-pointer"
    >
      {/* Top */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
          job?.jobType?.toLowerCase() === 'internship'
            ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
            : 'bg-green-50 text-green-600 border border-green-200'
        }`}>
          {job?.jobType?.toLowerCase() === 'internship' ? '💼 Internship' : '🎓 Job'}
        </span>

        <button
          onClick={handleSaveJob}
          className={`p-1.5 rounded-full border transition-all duration-200 ${
            isSaved
              ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700'
              : 'border-gray-200 text-gray-400 hover:border-purple-400 hover:text-purple-500 hover:bg-purple-50'
          }`}
        >
          <Bookmark size={14} className={isSaved ? 'fill-white' : ''} />
        </button>
      </div>

      {/* Company */}
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-xl font-bold text-purple-600 border border-purple-200 group-hover:scale-110 transition-transform duration-300">
          {job?.company?.name?.charAt(0) || 'C'}
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1">
            {job?.company?.name || 'Company'}
            <BadgeCheck size={14} className="text-purple-500" />
          </h3>
          <p className="text-xs text-gray-400">{job?.location || 'India'}</p>
        </div>
      </div>

      {/* Title */}
      <div>
        <h2 className="text-base font-bold text-gray-900 line-clamp-1 group-hover:text-purple-700 transition-colors">
          {job?.title || 'Job Title'}
        </h2>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {job?.description || 'No description available'}
        </p>
      </div>

      {/* Skills */}
      {job?.requirements && job.requirements.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {job.requirements.slice(0, 3).map((skill, index) => (
            <span key={index} className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
              {skill}
            </span>
          ))}
          {job.requirements.length > 3 && (
            <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
              +{job.requirements.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Info */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin size={13} />
          {job?.location || 'Remote'}
        </span>
        <span className="flex items-center gap-1">
          <Users size={13} />
          {job?.position || 1} openings
        </span>
        <span className="flex items-center gap-1">
          <Clock size={13} />
          {daysAgoFunction(job?.createdAt)}
        </span>
      </div>

      {/* Salary */}
      <div className="flex items-center justify-between bg-purple-50 rounded-xl px-3 py-2">
        <span className="text-xs text-gray-500">Salary</span>
        <span className="text-sm font-bold text-purple-600">
          ₹{job?.salary?.toLocaleString() || '0'}
        </span>
      </div>

      {/* Experience */}
      <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
        <span className="text-xs text-gray-500">Experience</span>
        <span className="text-sm font-bold text-gray-700">
          {job?.experienceLevel || '0-1'} Year
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-1">
        <button
          onClick={handleViewDetails}
          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold py-2 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02]"
        >
          View Details
        </button>
        <button
          onClick={handleApply}
          className="px-4 text-sm font-semibold py-2 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;