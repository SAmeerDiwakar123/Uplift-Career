import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Job from '@/pages/Job';

const TrendingJobs = () => {
  const { alljobs } = useSelector(store => store.job);
  const navigate = useNavigate();

  const trendingJobs = alljobs.slice(0, 3);

  return (
    <section className="py-8 sm:py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4">

        <div className="flex justify-between items-center mb-5 sm:mb-8">
          <h2 className="text-lg sm:text-3xl font-bold text-gray-900">
            🔥 Trending Jobs
          </h2>

          <button
            onClick={() => navigate('/jobs')}
            className="text-xs sm:text-base text-indigo-600 font-medium hover:underline"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {trendingJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrendingJobs;