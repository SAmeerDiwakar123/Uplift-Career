import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Briefcase, Star, DollarSign, Building2, Check, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, setFilters } from '@/redux/jobSlice';

const filterSections = [
  { icon: <MapPin size={16} />, title: 'Location', key: 'location', options: ['Delhi', 'Bangalore', 'Mumbai', 'Hyderabad', 'Pune', 'Remote', 'NCR', 'Chennai'] },
  { icon: <Briefcase size={16} />, title: 'Job Type', key: 'jobtype', options: ['Full Time', 'Part Time', 'Internship', 'Freelance', 'Contract'] },
  { icon: <Star size={16} />, title: 'Experience', key: 'experience', options: ['Fresher', '1-2 Years', '3-5 Years', '5+ Years'] },
  { icon: <DollarSign size={16} />, title: 'Salary', key: 'salary', options: ['0-3 LPA', '3-6 LPA', '6-10 LPA', '10-20 LPA', '20+ LPA'] },
  { icon: <Building2 size={16} />, title: 'Industry', key: 'industry', options: ['IT & Software', 'Marketing', 'Finance', 'Design', 'HR', 'Sales'] },
];

const FilterMegaDropdown = ({ isOpen, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchOption, setSearchOption] = useState('');
  const filters = useSelector((store) => store.job?.filters || {});
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSearchOption('');
    setActiveIndex(0);
  }, [isOpen]);

  if (!isOpen) return null;

  const activeSection = filterSections[activeIndex];
  const activeKey = activeSection?.key;

  const filteredOptions = searchOption
    ? activeSection?.options.filter((opt) =>
        opt.toLowerCase().includes(searchOption.toLowerCase())
      )
    : activeSection?.options;

  const handleSelect = (key, option) => {
    dispatch(setFilters({ [key]: filters[key] === option ? '' : option }));
  };

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity" />
      
      <div
        ref={dropdownRef}
        className="absolute left-1/2 -translate-x-1/2 top-[72px] w-full max-w-[640px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-[420px]">
          
          {/* Left Sidebar */}
          <div className="w-[220px] bg-gray-50/80 border-r border-gray-100 py-3 flex flex-col">
            <div className="px-4 pb-3 border-b border-gray-100 mb-2">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Filter by
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filterSections.map((section, index) => {
                const isActive = activeIndex === index;
                const hasValue = filters[section.key];

                return (
                  <button
                    key={section.key}
                    onMouseEnter={() => {
                      setActiveIndex(index);
                      setSearchOption('');
                    }}
                    onClick={() => {
                      setActiveIndex(index);
                      setSearchOption('');
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-all duration-150 relative group ${
                      isActive
                        ? 'bg-white text-indigo-600 font-semibold shadow-sm'
                        : 'text-gray-600 hover:bg-white/60'
                    }`}
                  >
                    <span className={`transition-colors ${isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'}`}>
                      {section.icon}
                    </span>
                    <span className="flex-1 truncate">{section.title}</span>
                    
                    {hasValue && (
                      <span className="bg-indigo-600 text-white text-[9px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                        1
                      </span>
                    )}
                    
                    {isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-indigo-600 rounded-l-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {activeCount > 0 && (
              <div className="px-4 py-3 border-t border-gray-100">
                <button
                  onClick={() => dispatch(clearFilter())}
                  className="w-full flex items-center justify-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-medium py-2 rounded-lg hover:bg-red-50 transition"
                >
                  <X size={13} />
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">{activeSection?.title}</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {filteredOptions?.length} options available
                </p>
              </div>
              
              {/* Search within options */}
              <div className="relative">
                <input
                  type="text"
                  value={searchOption}
                  onChange={(e) => setSearchOption(e.target.value)}
                  placeholder="Search..."
                  className="w-40 text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 pl-8 outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition"
                />
                <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchOption && (
                  <button onClick={() => setSearchOption('')} className="absolute right-2 top-1/2 -translate-y-1/2">
                    <X size={12} className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Options Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {filteredOptions?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <svg className="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-sm">No matches found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {filteredOptions?.map((option) => {
                    const isSelected = filters[activeKey] === option;
                    return (
                      <button
                        key={option}
                        onClick={() => handleSelect(activeKey, option)}
                        className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl text-sm transition-all duration-150 group ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                            : 'bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-transparent hover:border-indigo-100'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected ? 'border-white bg-white' : 'border-gray-300 group-hover:border-indigo-300'
                        }`}>
                          {isSelected && <Check size={12} className="text-indigo-600" />}
                        </span>
                        <span className="truncate">{option}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {activeCount > 0 ? `${activeCount} filter${activeCount > 1 ? 's' : ''} applied` : 'No filters applied'}
              </span>
              <button
                onClick={onClose}
                className="bg-indigo-600 text-white text-xs font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm"
              >
                Done
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FilterMegaDropdown;