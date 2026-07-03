import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Bookmark, MapPin, ArrowLeft, Users, Calendar, CheckCircle2, IndianRupee } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const JobDetail = () => {
  const { id: jobId } = useParams();
  const { user } = useSelector((s) => s.auth);
  const { singleJob } = useSelector((s) => s.job);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some((app) => app.applicant === user?._id) || false
          );
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load job');
      } finally {
        setLoading(false);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    if (applying || isApplied) return;
    setApplying(true);
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [...(singleJob.applications || []), { applicant: user._id }],
          })
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setApplying(false);
    }
  };

  const daysAgo = (time) => {
    const diff = new Date() - new Date(time);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days <= 0 ? 'Today' : `${days} day${days > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-[#008bdc] rounded-full animate-spin" />
      </div>
    );
  }

  if (!singleJob) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2 text-gray-500">
        <p className="text-sm">This job couldn't be found.</p>
        <button onClick={() => navigate(-1)} className="text-sm text-[#008bdc] font-medium">
          Go back
        </button>
      </div>
    );
  }

  const {title,company,jobType,experienceLevel,isRemote,salary,location,
    createdAt,description,requirements,applications,position,
  } = singleJob;

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Top Nav */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-sm font-medium text-gray-700">Job details</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ===== LEFT COLUMN ===== */}
          <div className="md:col-span-2 space-y-4">
            {/* Header Card */}
            <div className="bg-white rounded-xl border p-5">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-xl font-bold text-blue-600 shrink-0">
                  {company?.name?.[0]?.toUpperCase() || 'C'}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 leading-snug">{title}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{company?.name}</p>
                  <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-500">
                    <MapPin size={13} />
                    <span>{isRemote ? 'Work from home' : location}</span>
                  </div>
                </div>
                <button
                  className="shrink-0 w-9 h-9 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center hover:text-[#008bdc] hover:border-blue-300 transition-colors"
                  aria-label="Save job"
                >
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
                    <IndianRupee size={11} /> Salary
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
                    <Calendar size={11} /> Posted
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {createdAt ? daysAgo(createdAt) : '—'}
                  </p>
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
            {requirements?.filter(Boolean).length > 0 && (
              <div className="bg-white rounded-xl border p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Skills required</h3>
                <div className="flex flex-wrap gap-2">
                  {requirements
                    .filter(Boolean)
                    .map((req, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200 font-medium"
                      >
                        {req}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* ===== RIGHT COLUMN ===== */}
          <div className="space-y-4">
            {/* Apply Card */}
            <div className="bg-white rounded-xl border p-5 md:sticky md:top-20">
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-gray-500">Applicants</span>
                <span className="font-semibold text-gray-900">{applications?.length || 0}</span>
              </div>

              {user?.role === 'student' ? (
                <button
                  onClick={applyJobHandler}
                  disabled={isApplied || applying}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                    isApplied
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-[#008bdc] hover:bg-[#0070b0] text-white disabled:opacity-60'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 size={16} /> Applied
                    </>
                  ) : applying ? (
                    'Applying…'
                  ) : (
                    'Apply now'
                  )}
                </button>
              ) : (
                <p className="text-xs text-gray-400 text-center">Sign in as a student to apply</p>
              )}
            </div>

            {/* About Company */}
            <div className="bg-white rounded-xl border p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">About company</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-sm font-bold text-blue-600">
                  {company?.name?.[0]?.toUpperCase() || 'C'}
                </div>
                <p className="text-sm font-medium text-gray-900">{company?.name}</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {company?.description || 'No company description available.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      {user?.role === 'student' && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 z-40">
          <button
            onClick={applyJobHandler}
            disabled={isApplied || applying}
            className={`w-full py-3 rounded-lg text-sm font-semibold ${
              isApplied
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-[#008bdc] text-white disabled:opacity-60'
            }`}
          >
            {isApplied ? 'Applied ✓' : applying ? 'Applying…' : 'Apply now'}
          </button>
        </div>
      )}
      {user?.role === 'student' && <div className="md:hidden h-16" />}
    </div>
  );
};

export default JobDetail;