// Applications.jsx
import React from 'react';
import Navbar from '../../components/shared/Navbar';
import { MapPin, Clock, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import BottomNav from '@/components/shared/BottomNav';

const Applications = () => {
  useGetAppliedJobs();
  const { allAppliedJobs } = useSelector(store => store.job)
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-4 sm:mt-6 flex-1 w-full">

        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">My Applications</h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">Track all your job applications</p>

        {allAppliedJobs?.length == 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <span className="text-4xl sm:text-5xl mb-3">📋</span>
            <p className="text-sm sm:text-base text-gray-500 font-medium">No applications yet</p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Apply to jobs and track them here</p>
            <button onClick={() => navigate('/jobs')} className="mt-4 bg-indigo-600 text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-1.5 sm:py-2 rounded-xl hover:bg-indigo-700 transition">
              Explore Jobs
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:gap-4 pb-10">
            {allAppliedJobs?.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-5"
              >
                <div className="flex items-center justify-between gap-2">

                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-indigo-50 flex items-center justify-center text-base sm:text-xl font-bold text-indigo-600 border border-indigo-100 shrink-0">
                      {app?.job?.company?.name?.charAt(0)}
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1">
                        {app?.job?.company?.name}
                        <BadgeCheck size={11} className="text-indigo-500" />
                      </h3>

                      <h2 className="text-sm sm:text-base font-bold text-gray-900">
                        {app?.job?.title}
                      </h2>

                      <div className="flex items-center gap-2 sm:gap-3 mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={10} />
                          {app?.job?.location}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(app?.createdAt).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 sm:gap-2 shrink-0">
                    <span
                      className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${app?.status === "accepted"
                          ? "bg-green-50 text-green-600"
                          : app?.status === "rejected"
                            ? "bg-red-50 text-red-600"
                            : "bg-yellow-50 text-yellow-600"
                        }`}
                    >
                      {app?.status}
                    </span>

                    <button onClick={() => navigate(`/jobdetail/${app?.job?._id}`)} className="text-[10px] sm:text-xs text-indigo-600 hover:underline">
                      View Job
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
      <BottomNav/>
    </div>
  );
};

export default Applications;