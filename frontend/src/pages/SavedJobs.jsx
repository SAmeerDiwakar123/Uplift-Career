import React from 'react';
import Navbar from '../components/shared/Navbar';
import BottomNav from '@/components/shared/BottomNav';
import JobCard from "../components/job/JobCard"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SavedJobs = () => {
  const navigate = useNavigate();
  const savedJobs = useSelector(store => store.savedJob?.savedJobs) ?? [];

  return (  
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 mt-4 sm:mt-6 flex-1 w-full">
        <h1 className="text-2xl sm:text-2xl font-bold text-gray-900 mb-1">
          Saved Jobs
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-6">
          Jobs you saved for later
        </p>

        {savedJobs.length <= 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <span className="text-5xl mb-3">📭</span>
            <p className="text-gray-500 font-medium">No saved jobs yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Save jobs from the explore page
            </p>
            <button
              onClick={() => navigate('/jobs')}
              className="mt-4 bg-indigo-600 text-white text-sm font-semibold px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
            >
              Explore Jobs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-24">
            {savedJobs.map((job) => (
              <JobCard key={job._id} job={job} showRemove={true} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default SavedJobs;