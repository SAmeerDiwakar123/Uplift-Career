import Navbar from '../components/shared/Navbar';
import Job from './Job';
import FilterCard from '../components/FilterCard';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchJobByText } from '@/redux/jobSlice';
import left from "../assets/left.png";
import right from "../assets/right.png";
import { useState } from 'react';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Filter } from 'lucide-react';

const Jobs = () => {
  useGetAllJobs();
  const { alljobs, searchJobByText, filters } = useSelector(
    (store) => store.job
  );

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const jobsPerPage = 9;

  const filteredJobs = alljobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchJobByText.toLowerCase()) ||
      job.company?.name
        .toLowerCase()
        .includes(searchJobByText.toLowerCase()) ||
      job.location.toLowerCase().includes(searchJobByText.toLowerCase());

    const matchesLocation = filters.location
      ? job.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    const matchesJobType = filters.jobType
      ? job.jobType.toLowerCase().includes(filters.jobType.toLowerCase())
      : true;

    const matchesSalary = filters.salary
      ? job.salary.toString().includes(filters.salary.split("-")[0])
      : true;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesJobType &&
      matchesSalary
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <div className="bg-gray-50 h-screen flex flex-col">
      <Navbar />

      <div
        className="max-w-7xl mx-auto px-4 mt-6 flex flex-col w-full"
        style={{ height: "calc(100vh - 140px)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-sm sm:text-3xl font-bold text-gray-900">
            💼 Explore Jobs
          </h1>

          <div className="flex items-center gap-2">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="md:hidden flex items-center gap-1 bg-white border border-gray-200 rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 shadow-sm text-xs sm:text-sm text-gray-700"
            >
              <Filter size={12} /> Filters
            </button>

            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 shadow-sm w-32 sm:w-64">
              <input
                type="text"
                placeholder="Search jobs..."
                onChange={(e) =>
                  dispatch(setSearchJobByText(e.target.value))
                }
                className="text-xs sm:text-sm text-gray-700 outline-none w-full bg-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-6 flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/4 hidden md:block overflow-y-auto h-full">
            <FilterCard />
          </div>

          {/* Jobs */}
          <div className="flex-1 overflow-y-auto pb-10 px-2 md:px-4">
            <p id="job-list" className="text-[10px] sm:text-xs text-gray-400 mb-4">
              {filteredJobs.length} jobs found
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 0 && (
              <div className="flex items-center justify-center gap-1.5 mt-6">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="disabled:opacity-40"
                >
                  <img src={left} alt="Previous" className="w-4 h-3 sm:w-5 sm:h-4" />
                </button>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-6 h-6 sm:w-7 sm:h-7 text-[10px] sm:text-xs flex items-center justify-center border border-gray-300 rounded-md transition ${currentPage === index + 1
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="disabled:opacity-40"
                >
                  <img src={right} alt="Next" className="w-4 h-3 sm:w-5 sm:h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:hidden">
          <div className="bg-white w-full rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-sm sm:text-base text-gray-900">Filters</span>
              <button onClick={() => setShowFilters(false)} className="text-gray-500 text-lg">✕</button>
            </div>
            <FilterCard />
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;