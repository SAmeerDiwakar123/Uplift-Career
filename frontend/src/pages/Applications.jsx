  // Applications.jsx
  import React from 'react';
  import Navbar from '../components/shared/Navbar';
  import Footer from '../components/shared/Footer';
  import { MapPin, Clock, BadgeCheck, CheckCircle, XCircle, Loader } from 'lucide-react';
  import { useNavigate } from 'react-router-dom';
  import { useSelector } from 'react-redux';
  import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

  const Applications = () => {
    useGetAppliedJobs();
    const { allAppliedJobs } = useSelector(store => store.job)
    const navigate = useNavigate();

    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 mt-6 flex-1 w-full">

          <h1 className="text-3xl font-bold text-gray-900 mb-2">📋 My Applications</h1>
          <p className="text-sm text-gray-400 mb-6">Track all your job applications</p>

          {allAppliedJobs?.length == 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 text-center">
              <span className="text-5xl mb-3">📋</span>
              <p className="text-gray-500 font-medium">No applications yet</p>
              <p className="text-gray-400 text-sm mt-1">Apply to jobs and track them here</p>
              <button onClick={() => navigate('/jobs')} className="mt-4 bg-indigo-600 text-white text-sm font-semibold px-6 py-2 rounded-xl hover:bg-indigo-700 transition">
                Explore Jobs
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 pb-10">
              {allAppliedJobs?.map((app) => (
                <div
                  key={app._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-5"
                >
                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-xl font-bold text-indigo-600 border border-indigo-100">
                        {app?.job?.company?.name?.charAt(0)}
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1">
                          {app?.job?.company?.name}
                          <BadgeCheck size={13} className="text-indigo-500" />
                        </h3>

                        <h2 className="text-base font-bold text-gray-900">
                          {app?.job?.title}
                        </h2>

                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin size={11} />
                            {app?.job?.location}
                          </span>

                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {new Date(app?.createdAt).toLocaleDateString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${app?.status === "accepted"
                            ? "bg-green-50 text-green-600"
                            : app?.status === "rejected"
                              ? "bg-red-50 text-red-600"
                              : "bg-yellow-50 text-yellow-600"
                          }`}
                      >
                        {app?.status}
                      </span>

                      <button onClick={() => navigate(`/jobdetail/${app?.job?._id}`)}className="text-xs text-indigo-600 hover:underline">View Job </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    );
  };

  export default Applications;