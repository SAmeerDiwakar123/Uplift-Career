import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Bookmark, MapPin, ArrowLeft, Users, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const JobDetail = () => {
  const { id: jobId } = useParams();
  const { user } = useSelector(s => s.auth);
  const { singleJob } = useSelector(s => s.job);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isIntiallyApplied = singleJob?.applications?.some(
    application => application.applicant === user?._id || false
  );
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

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

  const daysAgo = (time) => {
    const diff = new Date() - new Date(time);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  if (!singleJob) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  const { title, company, jobType, experienceLevel, isRemote, salary, location, createdAt, description, requirements, applications, position } = singleJob;

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Top Nav */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-sm font-medium text-gray-700">Job Details</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ===== LEFT COLUMN ===== */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Header Card */}
            <div className="bg-white rounded-xl border p-5">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-xl font-bold text-blue-600 shrink-0">
                  {company?.name?.[0] || 'C'}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 leading-snug">{title}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{company?.name}</p>
                  <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-500">
                    <MapPin size={13} />
                    <span>{isRemote ? 'Work from home' : location}</span>
                  </div>
                </div>
                <button className="shrink-0 w-9 h-9 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center hover:text-blue-500 hover:border-blue-300 transition">
                  <Bookmark size={16} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-medium border border-blue-100">
                  {jobType}
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-gray-100 text-gray-600 border border-gray-200">
                  {experienceLevel || 'Fresher'}
                </span>
                {isRemote && (
                  <span className="text-xs px-2.5 py-1 rounded bg-green-50 text-green-700 font-medium border border-green-100">
                    Remote
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t">
                <div>
                  <p className="text-[11px] text-gray-500 mb-0.5 flex items-center gap-1">
                    <span className="text-gray-400">₹</span> Salary
                  </p>
                  <p className="text-sm font-semibold text-gray-900">₹{salary} LPA</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 mb-0.5 flex items-center gap-1">
                    <Users size={11} /> Openings
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{position || 'Multiple'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 mb-0.5 flex items-center gap-1">
                    <Users size={11} /> Applicants
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{applications?.length || 0}</p>
                </div>
              </div>
            </div>

            {/* About Job */}
            <div className="bg-white rounded-xl border p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">About the job</h3>
              <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Skills */}
            {requirements?.length > 0 && (
              <div className="bg-white rounded-xl border p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Skill(s) required</h3>
                <div className="flex flex-wrap gap-2">
                  {requirements.map((req, i) => req && (
                    <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200 font-medium">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Who can apply */}
            <div className="bg-white rounded-xl border p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Who can apply</h3>
              <ul className="text-[13px] text-gray-600 space-y-1.5 list-disc list-inside">
                <li>Only {experienceLevel || 'Fresher'} candidates can apply</li>
                <li>Must have relevant skills mentioned above</li>
                <li>Available for {jobType?.toLowerCase()} role</li>
                {isRemote && <li>Comfortable working remotely</li>}
              </ul>
            </div>

            {/* Perks */}
            <div className="bg-white rounded-xl border p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Perks</h3>
              <div className="flex flex-wrap gap-2">
                {['Certificate', 'Letter of recommendation', 'Flexible work hours', '5 days a week'].map((perk, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium">
                    {perk}
                  </span>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="bg-white rounded-xl border p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Activity on job</h3>
              <div className="space-y-2 text-[13px] text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <span>Posted: {createdAt ? `${daysAgo(createdAt)} days ago` : 'Recently'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-gray-400" />
                  <span>{applications?.length || 0} applicants</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN ===== */}
          <div className="space-y-4">
            
            {/* Apply Card */}
            <div className="bg-white rounded-xl border p-5 sticky top-20">
              <div className="text-center mb-4">
                <p className="text-xs text-gray-500 mb-1">Application deadline</p>
                <p className="text-sm font-semibold text-gray-900 flex items-center justify-center gap-1">
                  <Clock size={14} className="text-red-500" />
                  Apply soon
                </p>
              </div>

              {user?.role === 'student' && (
                <button
                  onClick={!isApplied ? applyJobHandler : null}
                  disabled={isApplied}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isApplied
                      ? 'bg-green-50 text-green-700 border border-green-200 flex items-center justify-center gap-1.5'
                      : 'bg-[#008bdc] hover:bg-[#0070b0] text-white'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 size={16} /> Applied
                    </>
                  ) : (
                    'Apply now'
                  )}
                </button>
              )}

              <div className="mt-4 pt-4 border-t text-center">
                <p className="text-[11px] text-gray-400">
                  {applications?.length || 0} students applied
                </p>
              </div>
            </div>

            {/* About Company */}
            <div className="bg-white rounded-xl border p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">About company</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-sm font-bold text-blue-600">
                  {company?.name?.[0] || 'C'}
                </div>
                <p className="text-sm font-medium text-gray-900">{company?.name}</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {company?.description || 'A growing company looking for talented individuals to join their team.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 z-40">
        {user?.role === 'student' && (
          <button
            onClick={!isApplied ? applyJobHandler : null}
            disabled={isApplied}
            className={`w-full py-3 rounded-lg text-sm font-semibold ${
              isApplied
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-[#008bdc] text-white'
            }`}
          >
            {isApplied ? 'Applied ✓' : 'Apply now'}
          </button>
        )}
      </div>
      <div className="lg:hidden h-16" />
    </div>
  );
};

export default JobDetail;