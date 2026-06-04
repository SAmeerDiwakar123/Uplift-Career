import React from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { Bookmark, MapPin, Clock, Users, BadgeCheck, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSavedJob } from '@/redux/savedJobSlice';

const SavedJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedJobs = useSelector(store => store.savedJob?.savedJobs) ?? [];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 mt-6 flex-1 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2"> Saved Jobs</h1>
        <p className="text-sm text-gray-400 mb-6">Jobs you saved for later</p>

        {savedJobs.length <= 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <span className="text-5xl mb-3">📭</span>
            <p className="text-gray-500 font-medium">No saved jobs yet</p>
            <p className="text-gray-400 text-sm mt-1">Save jobs from the explore page</p>
            <button onClick={() => navigate('/jobs')} className="mt-4 bg-indigo-600 text-white text-sm font-semibold px-6 py-2 rounded-xl hover:bg-indigo-700 transition">
              Explore Jobs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-10">
            {savedJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col gap-3">

                <div className="flex items-center justify-between">
                  <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-3 py-1 rounded-full">
                    {job?.jobType}
                  </span>
                  <button className="p-2 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-500 transition">
                    <Bookmark size={14} fill="currentColor" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl font-bold text-indigo-600 border border-indigo-100">
                    {job?.company?.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1">
                      {job?.company?.name}
                      <BadgeCheck size={13} className="text-indigo-500" />
                    </h3>
                    <p className="text-xs text-gray-400">India</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-bold text-gray-900">{job?.title}</h2>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{job?.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {job?.requirements?.slice(0, 3).map((req, i) => (
                    <span key={i} className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-lg">{req}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MapPin size={12} />{job?.location}</span>
                  <span className="flex items-center gap-1"><Users size={12} />{job?.applicants} applicants</span>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <IndianRupee size={12} />{job?.salary}
                  </span>
                  <span className="text-sm font-bold text-indigo-600">{job?.jobType}</span>
                </div>

                <div className="flex gap-2 mt-1">
                  <button onClick={() => navigate(`/jobdetail/${job?._id}`)} className="flex-1 bg-indigo-600 text-white text-sm font-semibold py-2 rounded-xl hover:bg-indigo-700 transition">
                    View Details
                  </button>
          

                  <button onClick={() => dispatch(toggleSavedJob(job))} className="px-4 text-sm font-semibold py-2 rounded-xl border text-red-400 border-red-200 hover:bg-red-50 transition">
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;