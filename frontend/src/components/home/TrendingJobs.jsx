import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight } from 'lucide-react';
import JobCard from '../job/JobCard'

const TrendingJobs = () => {
  const { alljobs } = useSelector(store => store.job);
  const navigate = useNavigate();

  const trendingJobs = alljobs?.slice(0, 4) || [];

  return (
    <section className="py-8 sm:py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Trending Jobs
            </h2>
            <p className="text-sm text-gray-500">Discover the most in-demand opportunities</p>
          </div>
          <button
            onClick={() => navigate('/jobs')}
            className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1 transition-colors"
          >
            View all jobs
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Jobs Grid */}
        {trendingJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 sm:py-16">
            <p className="text-sm text-gray-400">No trending jobs available right now.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default TrendingJobs;