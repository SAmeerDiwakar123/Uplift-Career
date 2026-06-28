import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchJobByText } from '@/redux/jobSlice';
import { Filter, Search, X } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import JobCard from '@/components/job/JobCard';
import FilterCard from '@/components/FilterCard';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Jobs = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  
  const { alljobs, searchJobByText, filters } = useSelector(
    (store) => store.job
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const jobsPerPage = 9;

  useEffect(() => {
    if (alljobs) {
      setIsLoading(false);
    }
  }, [alljobs]);

  // Filter Jobs
  const filteredJobs = alljobs?.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchJobByText?.toLowerCase() || '') ||
      job.company?.name?.toLowerCase().includes(searchJobByText?.toLowerCase() || '') ||
      job.location?.toLowerCase().includes(searchJobByText?.toLowerCase() || '');

    const matchesLocation = filters?.location
      ? job.location?.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    const matchesJobType = filters?.jobType
      ? job.jobType?.toLowerCase().includes(filters.jobType.toLowerCase())
      : true;

    const matchesSalary = filters?.salary
      ? job.salary?.toString().includes(filters.salary.split("-")[0])
      : true;

    return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
  }) || [];

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const clearSearch = () => {
    dispatch(setSearchJobByText(''));
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 px-4 py-2 rounded-full mb-4 shadow-sm">
              <span className="text-purple-600">💼</span>
              <span className="text-sm font-semibold text-purple-700">Find Your Dream Job</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-800 bg-clip-text text-transparent">
              Discover <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Amazing</span> Opportunities
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {filteredJobs.length} jobs found matching your criteria
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 py-4 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by title, company, or location..."
                value={searchJobByText || ''}
                onChange={(e) => dispatch(setSearchJobByText(e.target.value))}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
              {searchJobByText && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            {/* Filter Button - Mobile */}
            <button
              onClick={() => setShowFilters(true)}
              className="md:hidden px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm font-medium flex items-center gap-2 hover:bg-gray-100 transition"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Sidebar - FilterCard (Desktop) */}
            <div className="md:w-72 lg:w-80 flex-shrink-0 hidden md:block">
              <div className="sticky top-28">
                <FilterCard />
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                        <div>
                          <div className="h-4 bg-gray-200 rounded w-24" />
                          <div className="h-3 bg-gray-200 rounded w-16 mt-1" />
                        </div>
                      </div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-2/3 mb-3" />
                      <div className="flex gap-1 mb-3">
                        <div className="h-6 bg-gray-200 rounded w-16" />
                        <div className="h-6 bg-gray-200 rounded w-16" />
                      </div>
                      <div className="h-8 bg-gray-200 rounded w-full" />
                    </div>
                  ))}
                </div>
              ) : paginatedJobs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paginatedJobs.map((job) => (
                      <JobCard key={job._id} job={job} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-purple-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = index + 1;
                        } else if (currentPage <= 3) {
                          pageNum = index + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + index;
                        } else {
                          pageNum = currentPage - 2 + index;
                        }
                        
                        return (
                          <button
                            key={index}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 text-sm font-medium rounded-xl transition-all ${
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25'
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-purple-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                  <button
                    onClick={clearSearch}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:hidden">
          <div className="bg-white w-full rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-gray-900">Filters</span>
              <button 
                onClick={() => setShowFilters(false)} 
                className="text-gray-400 hover:text-gray-600 transition p-1"
              >
                <X size={24} />
              </button>
            </div>
            <FilterCard />
            <button
              onClick={() => setShowFilters(false)}
              className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition pb-20"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Jobs;






// import Navbar from '../components/shared/Navbar';
// import Job from './Job';
// import FilterCard from '../components/FilterCard';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSearchJobByText } from '@/redux/jobSlice';
// import left from "../assets/left.png";
// import right from "../assets/right.png";
// import { useState } from 'react';
// import useGetAllJobs from '@/hooks/useGetAllJobs';
// import { Filter } from 'lucide-react';
// import BottomNav from '@/components/shared/BottomNav';

// const Jobs = () => {
//   useGetAllJobs();
//   const { alljobs, searchJobByText, filters } = useSelector(
//     (store) => store.job
//   );

//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showFilters, setShowFilters] = useState(false);

//   const jobsPerPage = 9;

//   const filteredJobs = alljobs.filter((job) => {
//     const matchesSearch =
//       job.title.toLowerCase().includes(searchJobByText.toLowerCase()) ||
//       job.company?.name
//         .toLowerCase()
//         .includes(searchJobByText.toLowerCase()) ||
//       job.location.toLowerCase().includes(searchJobByText.toLowerCase());

//     const matchesLocation = filters.location
//       ? job.location.toLowerCase().includes(filters.location.toLowerCase())
//       : true;

//     const matchesJobType = filters.jobType
//       ? job.jobType.toLowerCase().includes(filters.jobType.toLowerCase())
//       : true;

//     const matchesSalary = filters.salary
//       ? job.salary.toString().includes(filters.salary.split("-")[0])
//       : true;

//     return (
//       matchesSearch &&
//       matchesLocation &&
//       matchesJobType &&
//       matchesSalary
//     );
//   });

//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   const paginatedJobs = filteredJobs.slice(
//     (currentPage - 1) * jobsPerPage,
//     currentPage * jobsPerPage
//   );

//   return (
//     <div className="bg-gray-50 h-screen flex flex-col">
//       <Navbar />

//       <div
//         className="max-w-7xl mx-auto px-2 sm:px-4 mt-2 sm:mt-6 flex flex-col w-full"
//         style={{ height: "calc(100vh - 140px)" }}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between mb-3 sm:mb-6">
//           <h1 className="text-sm sm:text-2xl font-bold text-gray-900">
//             💼 Explore Jobs
//           </h1>

//           <div className="flex items-center gap-1 sm:gap-2">
//             {/* Mobile Filter Button */}
//             <button
//               onClick={() => setShowFilters(true)}
//               className="md:hidden flex items-center gap-1 bg-white border border-gray-200 rounded-xl px-1.5 py-1 sm:px-3 sm:py-2 shadow-sm text-xs text-gray-700"
//             >
//               <Filter size={12} /> Filters
//             </button>

//             <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-1.5 py-1 sm:px-3 sm:py-2 shadow-sm w-28 sm:w-64">
//               <input
//                 type="text"
//                 placeholder="Search jobs..."
//                 onChange={(e) =>
//                   dispatch(setSearchJobByText(e.target.value))
//                 }
//                 className="text-xs text-gray-700 outline-none w-full bg-transparent"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-6 flex-1 overflow-hidden">
//           {/* Sidebar */}
//           <div className="w-1/4 hidden md:block overflow-y-auto h-full">
//             <FilterCard />
//           </div>

//           {/* Jobs */}
//           <div className="flex-1 overflow-y-auto pb-2 sm:pb-10 px-0.5 sm:px-2 md:px-4">
//             <p id="job-list" className="text-[10px] text-gray-400 mb-2 sm:mb-4">
//               {filteredJobs.length} jobs found
//             </p>

//             <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
//               {paginatedJobs.map((job) => (
//                 <Job key={job._id} job={job} />
//               ))}
//             </div>

//             {/* Pagination */}
//             {totalPages > 0 && (
//               <div className="flex items-center justify-center gap-1 mt-4 sm:mt-6">
//                 <button
//                   onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="disabled:opacity-40"
//                 >
//                   <img src={left} alt="Previous" className="w-3 h-2 sm:w-5 sm:h-4" />
//                 </button>

//                 {Array.from({ length: totalPages }).map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentPage(index + 1)}
//                     className={`w-5 h-5 sm:w-7 sm:h-7 text-[9px] sm:text-xs flex items-center justify-center border border-gray-300 rounded-md transition ${currentPage === index + 1
//                       ? "bg-blue-500 text-white border-blue-500"
//                       : "bg-white text-gray-600 hover:bg-gray-100"
//                       }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}

//                 <button
//                   onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="disabled:opacity-40"
//                 >
//                   <img src={right} alt="Next" className="w-3 h-2 sm:w-5 sm:h-4" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filter Drawer */}
//       {showFilters && (
//         <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:hidden">
//           <div className="bg-white w-full rounded-t-2xl p-3 max-h-[80vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-2">
//               <span className="font-bold text-sm text-gray-900">Filters</span>
//               <button onClick={() => setShowFilters(false)} className="text-gray-500 text-lg">✕</button>
//             </div>
//             <FilterCard />
//           </div>
//         </div>
//       )}
//       <BottomNav />
//     </div>
//   );
// };

// export default Jobs;