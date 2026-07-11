import { useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import InternshipCard from '../../components/internship/InternshipCard';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchInternshipByText, clearFilter, setFilters } from '@/redux/internshipSlice';
import useGetAllInternships from '../../hooks/Internship/useGetAllInternships';
import { Search, X, Filter } from 'lucide-react';
import BottomNav from '@/components/shared/BottomNav';
import HoverFilterPanel from '@/components/internship/HoverFilterPanel';
import InternshipFilter from '@/components/internship/InternshipFilter';

const Internships = () => {
  const { loading: isLoading } = useGetAllInternships();

  const dispatch = useDispatch();

  const allInternships = useSelector((store) => store.internship?.allInternships || []);
  const searchInternshipByText = useSelector((store) => store.internship?.searchInternshipByText || '');
  const filters = useSelector((store) => store.internship?.filters || {});

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter Logic
  const filteredInternships = allInternships.filter((internship) => {
    if (!internship) return false;

    const searchText = (searchInternshipByText || '').toLowerCase();

    const matchesSearch =
      internship.title?.toLowerCase().includes(searchText) ||
      internship.company?.name?.toLowerCase().includes(searchText) ||
      internship.location?.toLowerCase().includes(searchText);

    const locationArr = Array.isArray(filters.location) ? filters.location : [];
    const matchesLocation =
      locationArr.length === 0 ||
      locationArr.some((loc) => {
        if (loc === 'Remote') {
          return internship.isRemote === true;
        }
        return internship.location?.toLowerCase().includes(loc.toLowerCase());
      });

    const profileArr = Array.isArray(filters.profile) ? filters.profile : [];
    const matchesProfile =
      profileArr.length === 0 ||
      profileArr.some((prof) =>
        internship.title?.toLowerCase().includes(prof.toLowerCase())
      );

    const stipendArr = Array.isArray(filters.stipend) ? filters.stipend : [];
    const matchesStipend =
      stipendArr.length === 0 ||
      stipendArr.some((range) => {
        const stipend = Number(internship.stipend) || 0;
        switch (range) {
          case 'Unpaid': return stipend === 0;
          case '0-5k': return stipend >= 0 && stipend <= 5000;
          case '5k-10k': return stipend > 5000 && stipend <= 10000;
          case '10k-20k': return stipend > 10000 && stipend <= 20000;
          case '20k-50k': return stipend > 20000 && stipend <= 50000;
          case '50k+': return stipend > 50000;
          default: return true;
        }
      });

    const durationArr = Array.isArray(filters.duration) ? filters.duration : [];
    const matchesDuration =
      durationArr.length === 0 ||
      durationArr.some((dur) =>
        internship.duration?.toLowerCase().includes(dur.toLowerCase())
      );

    return (
      matchesSearch &&
      matchesLocation &&
      matchesProfile &&
      matchesStipend &&
      matchesDuration
    );
  });

  const handleSearch = (e) => {
    dispatch(setSearchInternshipByText(e.target.value));
  };

  const handleClear = () => {
    dispatch(setSearchInternshipByText(''));
  };

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleClearAll = () => {
    dispatch(clearFilter());
  };

  const activeCount = Object.values(filters || {}).reduce((acc, curr) => {
    return acc + (Array.isArray(curr) ? curr.length : 0);
  }, 0);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-2 sm:px-4 mt-4 flex-1 w-full pb-24">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <div className="hidden sm:block text-sm text-gray-500 whitespace-nowrap">
            <span className="font-semibold text-gray-700">{filteredInternships.length}</span> internships found
          </div>

          <div className="flex items-center gap-2 w-full">
            {/* Search Box */}
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3 py-2 w-full shadow-sm">
              <Search size={15} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search internships..."
                value={searchInternshipByText || ''}
                onChange={handleSearch}
                className="text-sm outline-none w-full bg-transparent text-gray-700 placeholder-gray-400 min-w-0"
              />
              {searchInternshipByText && (
                <button onClick={handleClear} aria-label="Clear search" className="flex-shrink-0">
                  <X size={14} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
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

            {/* Desktop Filter Panel */}
            <div className="hidden md:block flex-shrink-0">
              <HoverFilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
              />
            </div>
          </div>
        </div>

        {/* Filter Drawer - Mobile */}
        <InternshipFilter
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
        />

        {isLoading ? (
          <div className="min-h-[50vh] flex items-center justify-center w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredInternships.map(
                (internship) => internship && <InternshipCard key={internship._id} internship={internship} />
              )}
            </div>

            {filteredInternships.length === 0 && (
              <div className="text-center py-16 min-h-[40vh] flex flex-col items-center justify-center">
                <span className="text-4xl mb-2 block">🔍</span>
                <p className="text-gray-500 font-medium">No internships found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
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
      </main>

      <BottomNav />
    </div>
  );
};

export default Internships; 









// import { useState, useEffect } from 'react';
// import Navbar from '../../components/shared/Navbar';
// import InternshipCard from '../../components/internship/InternshipCard';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSearchInternshipByText, clearFilter, setFilters } from '@/redux/internshipSlice';
// import useGetAllInternships from '../../hooks/Internship/useGetAllInternships';
// import { Search, X, Filter } from 'lucide-react';
// import BottomNav from '@/components/shared/BottomNav';
// import HoverFilterPanel from '@/components/internship/HoverFilterPanel';
// import InternshipFilter from '@/components/internship/InternshipFilter';

// const Internships = () => {
//   useGetAllInternships();

//   const dispatch = useDispatch();

//   const allInternships = useSelector((store) => store.internship?.allInternships || []);
//   const searchInternshipByText = useSelector((store) => store.internship?.searchInternshipByText || '');
//   const filters = useSelector((store) => store.internship?.filters || {});
  
//   // 🌟 API Loading स्टेट
//   const isLoading = useSelector((store) => store.internship?.loading || false);

//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   // Filter Logic
//   const filteredInternships = allInternships.filter((internship) => {
//     if (!internship) return false;

//     const searchText = (searchInternshipByText || '').toLowerCase();

//     const matchesSearch =
//       internship.title?.toLowerCase().includes(searchText) ||
//       internship.company?.name?.toLowerCase().includes(searchText) ||
//       internship.location?.toLowerCase().includes(searchText);

//     const locationArr = Array.isArray(filters.location) ? filters.location : [];
//     const matchesLocation =
//       locationArr.length === 0 ||
//       locationArr.some((loc) => {
//         if (loc === 'Remote') {
//           return internship.isRemote === true || internship.location?.toLowerCase().includes('remote');
//         }
//         return internship.location?.toLowerCase().includes(loc.toLowerCase());
//       });

//     const profileArr = Array.isArray(filters.profile) ? filters.profile : [];
//     const matchesProfile =
//       profileArr.length === 0 ||
//       profileArr.some((prof) =>
//         internship.title?.toLowerCase().includes(prof.toLowerCase())
//       );

//     const stipendArr = Array.isArray(filters.stipend) ? filters.stipend : [];
//     const matchesStipend =
//       stipendArr.length === 0 ||
//       stipendArr.some((range) => {
//         const stipend = Number(internship.stipend) || 0;
//         switch (range) {
//           case 'Unpaid': return stipend === 0;
//           case '0-5k': return stipend >= 0 && stipend <= 5000;
//           case '5k-10k': return stipend > 5000 && stipend <= 10000;
//           case '10k-20k': return stipend > 10000 && stipend <= 20000;
//           case '20k-50k': return stipend > 20000 && stipend <= 50000;
//           case '50k+': return stipend > 50000;
//           default: return true;
//         }
//       });

//     const durationArr = Array.isArray(filters.duration) ? filters.duration : [];
//     const matchesDuration =
//       durationArr.length === 0 ||
//       durationArr.some((dur) =>
//         internship.duration?.toLowerCase().includes(dur.toLowerCase())
//       );

//     const modeArr = Array.isArray(filters.mode) ? filters.mode : [];
//     const matchesMode =
//       modeArr.length === 0 ||
//       modeArr.some((mode) => {
//         const modeLower = mode.toLowerCase();
//         if (modeLower === 'remote') {
//           return internship.mode?.toLowerCase() === 'remote' || internship.isRemote === true;
//         }
//         if (modeLower === 'in-office') {
//           return internship.mode?.toLowerCase() === 'in-office' || internship.isRemote === false;
//         }
//         if (modeLower === 'hybrid') {
//           return internship.mode?.toLowerCase() === 'hybrid';
//         }
//         return true;
//       });

//     return (
//       matchesSearch &&
//       matchesLocation &&
//       matchesProfile &&
//       matchesStipend &&
//       matchesDuration &&
//       matchesMode
//     );
//   });

//   const handleSearch = (e) => {
//     dispatch(setSearchInternshipByText(e.target.value));
//   };

//   const handleClear = () => {
//     dispatch(setSearchInternshipByText(''));
//   };

//   const handleFilterChange = (newFilters) => {
//     dispatch(setFilters(newFilters));
//   };

//   const handleClearAll = () => {
//     dispatch(clearFilter());
//   };

//   const activeCount = Object.values(filters || {}).reduce((acc, curr) => {
//     return acc + (Array.isArray(curr) ? curr.length : 0);
//   }, 0);

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-2 sm:px-4 mt-4 flex-1 w-full pb-24">
        
//         {/* Top Bar */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
//           <div className="hidden sm:block text-sm text-gray-500 whitespace-nowrap">
//             <span className="font-semibold text-gray-700">{filteredInternships.length}</span> internships found
//           </div>
          
//           <div className="flex items-center gap-2 w-full">
//             {/* Search Box */}
//             <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3 py-2 w-full shadow-sm">
//               <Search size={15} className="text-gray-400 flex-shrink-0" />
//               <input 
//                 type="text" 
//                 placeholder="Search internships..." 
//                 value={searchInternshipByText || ''}
//                 onChange={handleSearch} 
//                 className="text-sm outline-none w-full bg-transparent text-gray-700 placeholder-gray-400 min-w-0" 
//               />
//               {searchInternshipByText && (
//                 <button onClick={handleClear} aria-label="Clear search" className="flex-shrink-0">
//                   <X size={14} className="text-gray-400 hover:text-gray-600" />
//                 </button>
//               )}
//             </div>

//             {/* 🌟 CSS Responsive Solution: मोबाइल फ़िल्टर बटन */}
//             <div className="block md:hidden flex-shrink-0">
//               <button
//                 onClick={() => setIsDrawerOpen(true)}
//                 className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
//               >
//                 <Filter size={14} />
//                 {activeCount > 0 && (
//                   <span className="bg-indigo-600 text-white text-[10px] px-1.5 h-4 rounded-full flex items-center justify-center font-bold">
//                     {activeCount}
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* 🌟 CSS Responsive Solution: डेस्कटॉप फ़िल्टर पैनल (Zero Flicker) */}
//             <div className="hidden md:block flex-shrink-0">
//               <HoverFilterPanel
//                 filters={filters}
//                 onFilterChange={handleFilterChange}
//                 onClearAll={handleClearAll}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Filter Drawer - Mobile */}
//         <InternshipFilter
//           isOpen={isDrawerOpen}
//           onClose={() => setIsDrawerOpen(false)}
//           filters={filters}
//           onFilterChange={handleFilterChange}
//           onClearAll={handleClearAll}
//         />

//         {/* 🌟 API loading के समय लेआउट को स्थिर रखने के लिए Loader */}
//         {isLoading ? (
//           <div className="min-h-[50vh] flex items-center justify-center w-full">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//           </div>
//         ) : (
//           <>
//             {/* Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
//               {filteredInternships.map((internship) => (
//                 internship && <InternshipCard key={internship._id} internship={internship} />
//               ))}
//             </div>

//             {/* Empty State */}
//             {filteredInternships.length === 0 && (
//               <div className="text-center py-16 min-h-[40vh] flex flex-col items-center justify-center">
//                 <span className="text-4xl mb-2 block">🔍</span>
//                 <p className="text-gray-500 font-medium">No internships found</p>
//                 <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
//                 <button 
//                   onClick={handleClearAll}
//                   className="mt-2 text-sm text-indigo-600 font-medium hover:underline"
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </main>

//       <BottomNav />
//     </div>
//   );
// };

// export default Internships;