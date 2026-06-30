import { setSingleJob } from '@/redux/jobSlice';
import store from '@/redux/store';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { Bookmark, MapPin, Briefcase, ArrowLeft, Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const JobDetail = () => {
  const params = useParams();
  const jobId = params.id;
  const { user } = useSelector(store => store.auth);
  const { singleJob } = useSelector(store => store.job)
  const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id || false);
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
        const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user._id }] }
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    const fetchsinglejob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id || false))
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchsinglejob();
  }, [jobId, dispatch, user?._id])

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 pb-20 sm:pb-8">
      <div className="max-w-5xl mx-auto px-3 sm:px-4">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 hover:text-indigo-600 mb-4 sm:mb-6"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div className="grid lg:grid-cols-3 gap-3 sm:gap-6">

          {/* Left */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-6">

            {/* Main Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6">

              <div className="flex justify-between items-start">
                <div className="flex gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-lg sm:rounded-xl bg-indigo-50 flex items-center justify-center text-base sm:text-xl font-bold text-indigo-600 shrink-0">
                    {singleJob?.company?.name?.charAt(0)}
                  </div>

                  <div>
                    <h1 className="text-base sm:text-2xl font-bold">
                      {singleJob?.title}
                    </h1>
                    <p className="text-xs sm:text-base text-gray-600">
                      {singleJob?.company?.name}
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-3 text-[10px] sm:text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />{singleJob?.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase size={11} />{singleJob?.jobType}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />{singleJob?.createdAt?.split("T")[0]}
                      </span>
                    </div>
                  </div>
                </div>

                <Bookmark size={16} className="text-gray-400 shrink-0" />
              </div>

              {/* Salary */}
              <div className="mt-4 sm:mt-6 bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 flex justify-between">
                <span className="text-xs sm:text-sm text-gray-500">Salary</span>
                <span className="text-xs sm:text-base font-bold text-indigo-600">
                  ₹ {singleJob?.salary}
                </span>
              </div>

              {/* Apply */}
              <button
                onClick={!isApplied ? applyJobHandler : null}
                disabled={isApplied}
                className={`w-full mt-3 sm:mt-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-base font-semibold transition text-white
                  ${isApplied ? "bg-green-600 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </button>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6">
              <h2 className="text-sm sm:text-lg font-bold mb-2 sm:mb-4">
                Job Description
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {singleJob?.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6">
              <h2 className="text-sm sm:text-lg font-bold mb-2 sm:mb-4">
                Requirements
              </h2>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {singleJob?.requirements?.map((req, i) => req && (
                  <span key={i} className="text-[10px] sm:text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
                    {req}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div>
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6">
              <h2 className="text-sm sm:text-base font-bold mb-3 sm:mb-4">
                Company Info
              </h2>
              <p className="text-sm sm:text-base font-semibold">
                {singleJob?.company?.name}
              </p>
              <p className="text-[10px] sm:text-sm text-gray-500 mt-1 sm:mt-2">
                {singleJob?.location}
              </p>
              <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                <p className="text-[10px] sm:text-sm text-gray-600">
                  Experience: {singleJob?.experienceLevel} Years
                </p>
                <p className="text-[10px] sm:text-sm text-gray-600">
                  Applicants: {singleJob?.applications?.length || 0}
                </p>
                <p className="text-[10px] sm:text-sm text-gray-600">
                  Openings: {singleJob?.position}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default JobDetail;