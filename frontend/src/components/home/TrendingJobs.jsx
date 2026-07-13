import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TrendingUp, ArrowRight } from 'lucide-react';
import JobCard from '../job/JobCard'


const TrendingJobs = () => {
  const { alljobs } = useSelector(store => store.job);
  console.log("Trending Jobs:", alljobs);
  const navigate = useNavigate();

  const trendingJobs = alljobs?.slice(0, 3) || [];

  return (
    <section className="py-10 sm:py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <TrendingUp size={20} className="text-amber-500 sm:size-6" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
              Trending Jobs
            </h2>
          </div>

          <button
            onClick={() => navigate('/jobs')}
            className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            View All
            <ArrowRight size={14} className="sm:size-4" />
          </button>
        </div>

        {/* Jobs Grid */}
        {trendingJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
            {trendingJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 sm:py-16">
            <p className="text-sm text-slate-400">No trending jobs available right now.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default TrendingJobs;