// Jobs.jsx
import React from 'react';
import Navbar from '../components/shared/Navbar';
import Job from './Job';
import FilterCard from '../components/FilterCard';
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '@/redux/jobSlice';
import { useSelector } from 'react-redux';

const Jobs = () => {

  const { alljobs, searchJobByText, filters } = useSelector(store => store.job);
  const dispatch = useDispatch();

  const filteredJobs = alljobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchJobByText.toLowerCase()) ||
      job.company?.name.toLowerCase().includes(searchJobByText.toLowerCase()) ||
      job.location.toLowerCase().includes(searchJobByText.toLowerCase());

    const matchesLocation = filters.location
      ? job.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    const matchesJobType = filters.jobtype
      ? job.jobType.toLowerCase().includes(filters.jobtype.toLowerCase())
      : true;

    const matchesSalary = filters.salary
      ? job.salary.toString().includes(filters.salary.split("-")[0])
      : true;

    return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
  });

  return (
    <div className="bg-gray-50 h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 mt-6 flex flex-col w-full" style={{ height: 'calc(100vh - 140px)' }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">💼 Explore Jobs</h1>

          {/* Search */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-64">
            <input
              type="text"
              placeholder="Search jobs..."
              onChange={(e) => dispatch(setSearchJobByText(e.target.value))}
              className="text-sm text-gray-700 outline-none w-full bg-transparent"
            />
          </div>
        </div>

        <div className="flex gap-6 flex-1 overflow-hidden">

          {/* Sidebar */}
          <div className="w-1/4 hidden md:block overflow-y-auto h-full">
            <FilterCard />
          </div>

          {/* Jobs Grid */}
          <div className="flex-1 overflow-y-auto pb-10 px-2 md:px-4">
            <p className="text-xs text-gray-400 mb-4">{alljobs.length} jobs found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.map((job, index) => (
                <Job key={index} job={job} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs;