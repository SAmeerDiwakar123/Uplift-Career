import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchJobByText, setFilters, clearFilter } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// Components & Icons
import Navbar from '../../components/shared/Navbar';
import JobCard from '../../components/job/JobCard';
import BottomNav from '@/components/shared/BottomNav';
import { Search, X, Filter } from 'lucide-react';
import left from "../../assets/left.png";
import right from "../../assets/right.png";

import HoverFilterPanel from '@/components/job/HoverFilterPanel';
import FilterDrawer from '@/components/job/FilterDrawer';

const Jobs = () => {
  useGetAllJobs();
  
  const dispatch = useDispatch();

  const alljobs = useSelector((store) => store.job?.alljobs || []);
  const searchJobByText = useSelector((store) => store.job?.searchJobByText || '');
  const filters = useSelector((store) => store.job?.filters || {});
  
  // 🌟 API Loading स्टेट (अगर आपके Redux में loading स्टेट है तो इसे यूज़ करें, अन्यथा यह डिफ़ॉल्ट रूप से हैंडल हो जाएगा)
  const isLoading = useSelector((store) => store.job?.loading || false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  const filteredJobs = useMemo(() => {
    if (!Array.isArray(alljobs)) return [];

    const query = searchJobByText.toLowerCase().trim();

    return alljobs.filter((job) => {
      const matchesSearch =
        !query ||
        job.title?.toLowerCase().includes(query) ||
        job.company?.name?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query);

      const locationArr = Array.isArray(filters.location) ? filters.location : [];
      const matchesLocation =
        locationArr.length === 0 ||
        locationArr.some((loc) => 
          (job.location || '').toLowerCase().trim() === loc.toLowerCase().trim()
        );

      const jobTypeArr = Array.isArray(filters.jobType) ? filters.jobType : [];
      const matchesJobType =
        jobTypeArr.length === 0 ||
        jobTypeArr.some((type) => {
          const dbType = (job.jobType || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();
          const filterType = type.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
          return dbType === filterType;
        });

      const expArr = Array.isArray(filters.experience) ? filters.experience : [];
      const matchesExperience = 
        expArr.length === 0 ||
        expArr.some((expRange) => {
          const exp = Number(job.experienceLevel);
          switch (expRange) {
            case "Fresher (0-1 yr)":   return exp <= 1;
            case "Junior (1-3 yrs)":  return exp > 1 && exp <= 3;
            case "Mid (3-5 yrs)":     return exp > 3 && exp <= 5;
            case "Senior (5-8 yrs)":  return exp > 5 && exp <= 8;
            case "Lead (8+ yrs)":     return exp > 8;
            default:                  return true;
          }
        });

      const industryArr = Array.isArray(filters.industry) ? filters.industry : [];
      const matchesIndustry =
        industryArr.length === 0 ||
        industryArr.some((ind) => 
          (job.company?.industry || '').toLowerCase().includes(ind.toLowerCase())
        );

      const salaryArr = Array.isArray(filters.salary) ? filters.salary : [];
      const matchesSalary = 
        salaryArr.length === 0 ||
        salaryArr.some((salRange) => {
          const salaryLPA = Number(job.salary) / 100000;
          switch (salRange) {
            case "0-3 LPA":   return salaryLPA >= 0 && salaryLPA <= 3;
            case "3-6 LPA":   return salaryLPA > 3 && salaryLPA <= 6;
            case "6-10 LPA":  return salaryLPA > 6 && salaryLPA <= 10;
            case "10-20 LPA": return salaryLPA > 10 && salaryLPA <= 20;
            case "20+ LPA":   return salaryLPA > 20;
            default:          return true;
          }
        });

      return (
        matchesSearch &&
        matchesLocation &&
        matchesJobType &&
        matchesExperience &&
        matchesIndustry &&
        matchesSalary
      );
    });
  }, [alljobs, searchJobByText, filters]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage, 
    currentPage * jobsPerPage
  );

  const handleSearch = (e) => {
    dispatch(setSearchJobByText(e.target.value));
    setCurrentPage(1);
  };

  const handleClear = () => {
    dispatch(setSearchJobByText(''));
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    dispatch(clearFilter());
    setCurrentPage(1);
  };

  const activeCount = Object.values(filters || {}).reduce((acc, curr) => {
    return acc + (Array.isArray(curr) ? curr.length : 0);
  }, 0);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-2 sm:px-4 mt-4 flex-1 w-full pb-24">
        
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <div className="hidden sm:block text-sm text-gray-500 whitespace-nowrap">
            <span className="font-semibold text-gray-700">{filteredJobs.length}</span> jobs found
          </div>
          
          <div className="flex items-center gap-2 w-full">
            {/* Search Box */}
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3 py-2 w-full shadow-sm">
              <Search size={15} className="text-gray-400 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search jobs, companies..." 
                value={searchJobByText || ''}
                onChange={handleSearch} 
                className="text-sm outline-none w-full bg-transparent text-gray-700 placeholder-gray-400 min-w-0" 
              />
              {searchJobByText && (
                <button onClick={handleClear} aria-label="Clear search" className="flex-shrink-0">
                  <X size={14} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* 🌟 CSS Responsive Solution: मोबाइल फ़िल्टर बटन (केवल मोबाइल पर दिखेगा) */}
            <div className="block md:hidden flex-shrink-0">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
              >
                <Filter size={14} />
                {activeCount > 0 && (
                  <span className="bg-indigo-600 text-white text-[10px] px-1.5 h-4 rounded-full flex items-center justify-center font-bold">
                    {activeCount}
                  </span>
                )}
              </button>
            </div>

            {/* 🌟 CSS Responsive Solution: डेस्कटॉप फ़िल्टर पैनल (मोबाइल पर तुरंत छुप जाएगा, flicker नहीं करेगा) */}
            <div className="hidden md:block flex-shrink-0">
              <HoverFilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
              />
            </div>
          </div>
        </div>

        <FilterDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
        />

        {/* 🌟 API loading के समय लेआउट को स्थिर रखने के लिए Loader */}
        {isLoading ? (
          <div className="min-h-[50vh] flex items-center justify-center w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {paginatedJobs.map((job) => (
                job && <JobCard key={job._id} job={job} />
              ))}
            </div>

            {/* Empty State */}
            {paginatedJobs.length === 0 && (
              <div className="text-center py-16 min-h-[40vh] flex flex-col items-center justify-center">
                <span className="text-4xl mb-2 block">🔍</span>
                <p className="text-gray-500">No jobs found matching your search</p>
                <button 
                  onClick={handleClearAll}
                  className="mt-2 text-sm text-indigo-600 font-medium hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-6">
            <button 
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} 
              disabled={currentPage === 1}
              className="disabled:opacity-40 p-1"
            >
              <img src={left} className="w-5 h-4" alt="Previous" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button 
                  key={pageNum} 
                  onClick={() => setCurrentPage(pageNum)} 
                  className={`w-8 h-8 text-xs flex items-center justify-center border rounded-md transition-colors ${
                    currentPage === pageNum 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button 
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} 
              disabled={currentPage === totalPages}
              className="disabled:opacity-40 p-1"
            >
              <img src={right} className="w-5 h-4" alt="Next" />
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Jobs;