import Navbar from '../../components/shared/Navbar';
import JobCard from '../../components/job/JobCard';
import FilterDrawer from '../../components/FilterDrawer';
import FilterMegaDropdown from '../../components/FilterMegaDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchJobByText, clearFilter, setFilters } from '@/redux/jobSlice';
import left from "../../assets/left.png";
import right from "../../assets/right.png";
import { useState } from 'react';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Search, X } from 'lucide-react';
import BottomNav from '@/components/shared/BottomNav';

const Jobs = () => {
  useGetAllJobs();
  const { alljobs, searchJobByText, filters } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const jobsPerPage = 9;

  const filteredJobs = alljobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchJobByText.toLowerCase()) ||
      job.company?.name.toLowerCase().includes(searchJobByText.toLowerCase()) ||
      job.location.toLowerCase().includes(searchJobByText.toLowerCase());

    const matchesLocation = filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
    const matchesJobType = filters.jobtype ? job.jobType.toLowerCase().includes(filters.jobtype.toLowerCase()) : true;
    const matchesSalary = filters.salary ? job.salary.toString().includes(filters.salary.split("-")[0]) : true;

    return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);
  const activeCount = Object.values(filters).filter(Boolean).length;

  const filterSections = [
    { title: 'Location', key: 'location' },
    { title: 'Job Type', key: 'jobtype' },
    { title: 'Experience', key: 'experience' },
    { title: 'Salary', key: 'salary' },
    { title: 'Industry', key: 'industry' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      {/* Filter Bar */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center gap-2 py-2 overflow-x-auto">
            
            {/* Mobile: Filter Button */}
            <button onClick={() => setShowFilters(true)} className="md:hidden flex items-center gap-1 bg-gray-100 rounded-lg px-3 py-1.5 text-xs font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="21" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" />
                <line x1="21" y1="14" x2="3" y2="14" /><line x1="21" y1="18" x2="3" y2="18" />
              </svg>
              Filters {activeCount > 0 && `(${activeCount})`}
            </button>

            {/* Desktop: Filter Button */}
            <button onClick={() => setShowFilters(true)} className="hidden md:flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium transition">
              Filters
              {activeCount > 0 && <span className="bg-indigo-600 text-white text-[8px] px-1.5 py-0.5 rounded-full">{activeCount}</span>}
            </button>

            {/* Active Chips */}
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              const section = filterSections.find((s) => s.key === key);
              return (
                <span key={key} className="flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1.5 rounded-lg border border-indigo-100">
                  {section?.title}: {value}
                  <button onClick={() => dispatch(setFilters({ [key]: '' }))}><X size={12} /></button>
                </span>
              );
            })}

            {activeCount > 0 && (
              <button onClick={() => dispatch(clearFilter())} className="text-xs text-red-500 font-medium">Clear all</button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <FilterDrawer isOpen={showFilters} onClose={() => setShowFilters(false)} />
      </div>

      {/* Desktop Mega Dropdown */}
      <div className="hidden md:block">
        <FilterMegaDropdown isOpen={showFilters} onClose={() => setShowFilters(false)} />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 mt-4 flex-1 w-full pb-24">
        <div className="flex items-center justify-between mb-4">
          <div className="hidden sm:block">
            <h1 className="text-xl lg:text-2xl font-bold">💼 Explore Jobs</h1>
            <p className="text-xs text-gray-500 mt-1">{filteredJobs.length} jobs found</p>
          </div>
          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <div className="flex items-center gap-2 bg-white border rounded-xl px-3 py-2 w-full sm:w-64">
              <Search size={14} className="text-gray-400" />
              <input type="text" placeholder="Search jobs..." onChange={(e) => dispatch(setSearchJobByText(e.target.value))} className="text-xs outline-none w-full bg-transparent" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {paginatedJobs.map((job) => <JobCard key={job._id} job={job} />)}
        </div>

        {paginatedJobs.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl mb-2 block">🔍</span>
            <p className="text-gray-500">No jobs found</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-6">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}><img src={left} className="w-5 h-4" /></button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 text-xs flex items-center justify-center border rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}>{i + 1}</button>
            ))}
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}><img src={right} className="w-5 h-4" /></button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Jobs;