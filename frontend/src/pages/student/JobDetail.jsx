import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Bookmark, MapPin, Briefcase, ArrowLeft, Clock, FileText, Wrench, Info, DollarSign, Users, Calendar } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const JobDetail = () => {
  const params = useParams();
  const jobId = params.id;
  const { user } = useSelector(store => store.auth);
  const { singleJob } = useSelector(store => store.job);
  
  const isIntiallyApplied = singleJob?.applications?.some(
    application => application.applicant === user?._id || false
  );
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = { 
          ...singleJob, 
          applications: [...singleJob.applications, { applicant: user._id }] 
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchsinglejob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(
            application => application.applicant === user?._id || false
          ));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchsinglejob();
  }, [jobId, dispatch, user?._id]);

  const daysAgo = (time) => {
    const diff = new Date() - new Date(time);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  if (!singleJob) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center text-gray-500 text-sm">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 max-w-md mx-auto">

      {/* Compact Header */}
      <div className="bg-white px-3 py-2 flex items-center gap-2 sticky top-0 z-20 border-b">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1">
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <h1 className="text-sm font-semibold truncate">Job Details</h1>
      </div>

      {/* Company + Title */}
      <div className="bg-white px-3 py-3">
        <div className="flex gap-2.5">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-base font-bold text-indigo-600 shrink-0">
            {singleJob?.company?.name?.charAt(0) || 'C'}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-gray-900 leading-tight">
              {singleJob?.title}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">{singleJob?.company?.name}</p>
          </div>
          <button className="shrink-0 w-8 h-8 flex items-center justify-center text-gray-400">
            <Bookmark size={16} />
          </button>
        </div>

        {/* Chips */}
        <div className="flex gap-1.5 mt-2.5 flex-wrap">
          <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600">
            {singleJob?.jobType}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600">
            {singleJob?.experienceLevel || 'Fresher'}
          </span>
          {singleJob?.isRemote && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-green-50 text-green-600">
              Remote
            </span>
          )}
        </div>
      </div>

      {/* Salary + CTA */}
      <div className="bg-white mt-1.5 px-3 py-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[10px] text-gray-500">Salary</p>
            <p className="text-base font-bold text-gray-900">₹{singleJob?.salary} <span className="text-xs font-normal text-gray-500">LPA</span></p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500">{singleJob?.applications?.length || 0} applicants</p>
          </div>
        </div>

        {user?.role === 'student' && (
          <button
            onClick={!isApplied ? applyJobHandler : null}
            disabled={isApplied}
            className={`w-full py-2.5 rounded-lg text-xs font-semibold ${
              isApplied
                ? 'bg-green-50 text-green-600 border border-green-200'
                : 'bg-indigo-600 text-white'
            }`}
          >
            {isApplied ? 'Applied ✓' : 'Apply Now'}
          </button>
        )}
      </div>

      {/* Details Grid */}
      <div className="bg-white mt-1.5 px-3 py-3">
        <h3 className="text-xs font-semibold text-gray-900 mb-2">Details</h3>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-gray-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500">Location</p>
              <p className="text-xs text-gray-900 truncate">{singleJob?.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={13} className="text-gray-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500">Type</p>
              <p className="text-xs text-gray-900 truncate">{singleJob?.jobType}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users size={13} className="text-gray-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500">Experience</p>
              <p className="text-xs text-gray-900 truncate">{singleJob?.experienceLevel || 'Fresher'} Yrs</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-gray-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500">Posted</p>
              <p className="text-xs text-gray-900 truncate">{singleJob?.createdAt ? daysAgo(singleJob.createdAt) + 'd ago' : 'Recent'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white mt-1.5 px-3 py-3">
        <h3 className="text-xs font-semibold text-gray-900 mb-1.5">About this job</h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          {singleJob?.description}
        </p>
      </div>

      {/* Requirements */}
      {singleJob?.requirements?.length > 0 && (
        <div className="bg-white mt-1.5 px-3 py-3">
          <h3 className="text-xs font-semibold text-gray-900 mb-1.5">Requirements</h3>
          <div className="flex flex-wrap gap-1.5">
            {singleJob.requirements.map((req, i) => req && (
              <span key={i} className="text-[10px] px-2 py-1 rounded bg-gray-50 text-gray-600 border border-gray-100">
                {req}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default JobDetail;