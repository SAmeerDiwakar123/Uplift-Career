import { useState, useEffect } from 'react';
import Navbar from '../../components/shared/Navbar';
import InternshipCard from '../../components/internship/InternshipCard';
import InternshipFilter from '../../components/internship/InternshipFilter';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchInternshipByText, clearFilter, setFilters } from '@/redux/internshipSlice';
import useGetAllInternships from '../../hooks/Internship/useGetAllInternships';
import { Search, X } from 'lucide-react';
import BottomNav from '@/components/shared/BottomNav';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  return matches;
};

const Internships = () => {
  useGetAllInternships();

  const { allInternships = [], searchInternshipByText = '', filters = {} } = useSelector(
    (store) => store.internship || {}
  );

  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const activeCount = Object.values(filters || {}).filter(Boolean).length;

  const filterSections = [
    { title: 'Location', key: 'location' },
    { title: 'Profile', key: 'profile' },
    { title: 'Stipend', key: 'stipend' },
    { title: 'Duration', key: 'duration' },
    { title: 'Mode', key: 'mode' },
  ];

  const filteredInternships = allInternships.filter((internship) => {
    if (!internship) return false;

    const searchText = (searchInternshipByText || '').toLowerCase();

    const matchesSearch =
      internship.title?.toLowerCase().includes(searchText) ||
      internship.company?.name?.toLowerCase().includes(searchText) ||
      internship.location?.toLowerCase().includes(searchText);

    // LOCATION FILTER: Remote ke liye isRemote bhi check karega
    const matchesLocation = filters?.location
      ? filters.location === 'Remote'
        ? internship.isRemote === true || internship.location?.toLowerCase().includes('Remote')
        : internship.location?.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    //  PROFILE FILTER: title mein search karega
    const matchesProfile = filters?.profile
      ? internship.title?.toLowerCase().includes(filters.profile.toLowerCase())
      : true;

    //  STIPEND FILTER: range properly handle karega
    const matchesStipend = filters?.stipend
      ? (() => {
        const stipend = Number(internship.stipend) || 0;
        switch (filters.stipend) {
          case 'Unpaid': return stipend === 0;
          case '0-5k': return stipend >= 0 && stipend <= 5000;
          case '5k-10k': return stipend > 5000 && stipend <= 10000;
          case '10k-20k': return stipend > 10000 && stipend <= 20000;
          case '20k-50k': return stipend > 20000 && stipend <= 50000;
          case '50k+': return stipend > 50000;
          default: return true;
        }
      })()
      : true;

    // DURATION FILTER
    const matchesDuration = filters?.duration
      ? internship.duration?.toLowerCase().includes(filters.duration.toLowerCase())
      : true;

    // MODE FILTER: isRemote se derive karega agar mode field na ho
    const matchesMode = filters?.mode
      ? (() => {
        const mode = filters.mode.toLowerCase();
        if (mode === 'remote') {
          return internship.mode?.toLowerCase() === 'remote' || internship.isRemote === true;
        }
        if (mode === 'in-office') {
          return internship.mode?.toLowerCase() === 'in-office' || internship.isRemote === false;
        }
        if (mode === 'hybrid') {
          return internship.mode?.toLowerCase() === 'hybrid';
        }
        return true;
      })()
      : true;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesProfile &&
      matchesStipend &&
      matchesDuration &&
      matchesMode
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      {/* Filter Bar */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-hide">

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="md:hidden flex items-center gap-1 bg-gray-100 rounded-lg px-3 py-1.5 text-xs font-medium"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="21" y1="10" x2="3" y2="10" />
                <line x1="21" y1="6" x2="3" y2="6" />
                <line x1="21" y1="14" x2="3" y2="14" />
                <line x1="21" y1="18" x2="3" y2="18" />
              </svg>
              Filters
              {activeCount > 0 && ` (${activeCount})`}
            </button>
            
            {/* Desktop Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="hidden md:flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium transition"
            >
              Filters
              {activeCount > 0 && (
                <span className="bg-indigo-600 text-white text-[8px] px-1.5 py-0.5 rounded-full">
                  {activeCount}
                </span>
              )}
            </button>

            {/* Active Chips */}
            {Object.entries(filters || {}).map(([key, value]) => {
              if (!value) return null;
              const section = filterSections.find((s) => s.key === key);
              return (
                <span
                  key={key}
                  className="flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1.5 rounded-lg border border-indigo-100 flex-shrink-0"
                >
                  {section?.title}: {value}
                  <button onClick={() => dispatch(setFilters({ [key]: '' }))}>
                    <X size={12} />
                  </button>
                </span>
              );
            })}

            {activeCount > 0 && (
              <button
                onClick={() => dispatch(clearFilter())}
                className="text-xs text-red-500 font-medium flex-shrink-0"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <InternshipFilter
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        variant={isDesktop ? 'mega' : 'drawer'}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 mt-4 flex-1 w-full pb-24">

        <div className="flex items-center justify-between mb-4">
          <div className="hidden sm:block">
            <p className="text-sm text-gray-500 mt-1">
              {filteredInternships.length} internships found
            </p>
          </div>

          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <div className="flex items-center gap-2 bg-white border rounded-xl px-3 py-2 w-full sm:w-64">
              <Search size={14} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search internships..."
                value={searchInternshipByText || ''}
                onChange={(e) => dispatch(setSearchInternshipByText(e.target.value))}
                className="text-xs outline-none w-full bg-transparent"
              />
              {searchInternshipByText && (
                <button onClick={() => dispatch(setSearchInternshipByText(''))}>
                  <X size={14} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filteredInternships.map((internship) => (
            internship && <InternshipCard key={internship._id} internship={internship} />
          ))}
        </div>

        {/* Empty State */}
        {filteredInternships.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl mb-2 block">🔍</span>
            <p className="text-gray-500 font-medium">No internships found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Internships;