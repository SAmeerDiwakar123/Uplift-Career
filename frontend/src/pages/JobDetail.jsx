import { setSingleJob } from '@/redux/jobSlice';
import store from '@/redux/store';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { BadgeCheck, Bookmark, MapPin, Users, Briefcase, DollarSign, ArrowLeft, Share2, Clock, Building2, Globe, Mail, Phone } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';


const JobDetail = () => {

  // const isApplied = true
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
      console.log(error);
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">

        {/* Back */}
        <button
          onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6" > <ArrowLeft size={18} />Back</button>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">

            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">

              <div className="flex justify-between items-start">

                <div className="flex gap-4">

                  <div className="h-14 w-14 rounded-xl bg-indigo-50 flex items-center justify-center text-xl font-bold text-indigo-600">
                    {singleJob?.company?.name?.charAt(0)}
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold">
                      {singleJob?.title}
                    </h1>

                    <p className="text-gray-600">
                      {singleJob?.company?.name}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">

                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {singleJob?.location}
                      </span>

                      <span className="flex items-center gap-1">
                        <Briefcase size={14} />
                        {singleJob?.jobType}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {singleJob?.createdAt?.split("T")[0]}
                      </span>

                    </div>
                  </div>

                </div>

                <Bookmark className="text-gray-400" />
              </div>

              {/* Salary */}
              <div className="mt-6 bg-gray-50 rounded-xl p-4 flex justify-between">
                <span className="text-gray-500">Salary</span>

                <span className="font-bold text-indigo-600">
                  ₹ {singleJob?.salary}
                </span>
              </div>

              {/* Apply */}
              <button
                onClick={!isApplied ? applyJobHandler : null}
                disabled={isApplied}
                className={`w-full mt-6 py-3 rounded-xl font-semibold transition text-white
    ${isApplied
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </button>

            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">

              <h2 className="font-bold text-lg mb-4">
                Job Description
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {singleJob?.description}
              </p>

            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">

              <h2 className="font-bold text-lg mb-4">
                Requirements
              </h2>

              <div className="flex flex-wrap gap-2">

                {singleJob?.requirements?.[0] && (
                  <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
                    {singleJob.requirements[0]}
                  </span>
                )}

                {singleJob?.requirements?.[1] && (
                  <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
                    {singleJob.requirements[1]}
                  </span>
                )}

                {singleJob?.requirements?.[2] && (
                  <span className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">
                    {singleJob.requirements[2]}
                  </span>
                )}

              </div>

            </div>

          </div>

          {/* Right Sidebar */}
          <div>

            <div className="bg-white rounded-2xl shadow-sm border p-6">

              <h2 className="font-bold mb-4">
                Company Info
              </h2>

              <p className="font-semibold">
                {singleJob?.company?.name}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {singleJob?.location}
              </p>

              <p className="text-sm text-gray-600 mt-4">
                Experience: {singleJob?.experienceLevel} Years
              </p>

              <p className="text-sm text-gray-600 mt-2">
                Applican: {singleJob?.applications?.length || 0}
              </p>

              <p className="text-sm text-gray-600 mt-2">
                Openings: {singleJob?.position}
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
export default JobDetail;