import React, { useState } from 'react';
import {
  MapPin,
  Briefcase,
  Star,
  DollarSign,
  Building2,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, setFilters } from '@/redux/jobSlice';

const filterSections = [
  {
    icon: <MapPin size={15} />,
    title: 'Location',
    key: 'location',
    options: ['Delhi', 'Bangalore', 'Mumbai', 'Hyderabad', 'Pune', 'Remote', 'NCR', 'Chennai'],
  },
  {
    icon: <Briefcase size={15} />,
    title: 'Job Type',
    key: 'jobtype',
    options: ['Full Time', 'Part Time', 'Internship', 'Freelance', 'Contract'],
  },
  {
    icon: <Star size={15} />,
    title: 'Experience',
    key: 'experience',
    options: ['Fresher', '1-2 Years', '3-5 Years', '5+ Years'],
  },
  {
    icon: <DollarSign size={15} />,
    title: 'Salary',
    key: 'salary',
    options: ['0-3 LPA', '3-6 LPA', '6-10 LPA', '10-20 LPA', '20+ LPA'],
  },
  {
    icon: <Building2 size={15} />,
    title: 'Industry',
    key: 'industry',
    options: ['IT & Software', 'Marketing', 'Finance', 'Design', 'HR', 'Sales'],
  },
];

const FilterSidebar = () => {
  const [expanded, setExpanded] = useState([]);
  const filters = useSelector((store) => store.job?.filters || {});
  const dispatch = useDispatch();

  const activeCount = Object.values(filters).filter(Boolean).length;

  const toggleSection = (title) => {
    setExpanded((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleSelect = (key, option) => {
    const current = filters[key];
    if (current === option) {
      dispatch(setFilters({ [key]: '' }));
    } else {
      dispatch(setFilters({ [key]: option }));
    }
  };

  const clearAll = () => {
    dispatch(clearFilter());
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sticky top-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-indigo-600" />
          <span className="text-xs font-bold text-gray-900 tracking-widest uppercase">
            Filters
          </span>
        </div>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition"
          >
            <X size={11} /> clear
          </button>
        )}
      </div>

      {/* Active Filters */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 text-[10px] font-medium px-2 py-0.5 rounded-md border border-indigo-100"
              >
                {value}
                <button
                  onClick={() => dispatch(setFilters({ [key]: '' }))}
                  className="hover:text-red-500 transition"
                >
                  <X size={10} />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Filter Sections */}
      <div className="flex flex-col gap-1">
        {filterSections.map((section) => {
          const isExpanded = expanded.includes(section.title);
          const selected = filters[section.key];

          return (
            <div key={section.key} className="relative">
              <button
                onClick={() => toggleSection(section.title)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                  isExpanded
                    ? 'bg-indigo-600 text-white shadow-md'
                    : selected
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={isExpanded ? 'text-white' : selected ? 'text-indigo-500' : 'text-gray-400'}>
                    {section.icon}
                  </span>
                  <span className="text-xs font-semibold">{section.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp size={13} className={isExpanded ? 'text-white' : 'text-gray-300'} />
                ) : (
                  <ChevronDown size={13} className={isExpanded ? 'text-white' : 'text-gray-300'} />
                )}
              </button>

              {/* Selected Value Display */}
              {selected && !isExpanded && (
                <div className="mx-3 mb-1 mt-0.5 text-[11px] text-indigo-500 font-medium truncate">
                  ✓ {selected}
                </div>
              )}

              {/* Dropdown Options */}
              {isExpanded && (
                <div className="absolute left-full top-0 ml-3 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 p-2">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest px-2 py-1.5">
                    {section.title}
                  </p>
                  {section.options.map((option) => {
                    const isSelected = filters[section.key] === option;
                    return (
                      <button
                        key={option}
                        onClick={() => handleSelect(section.key, option)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-xl transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
                        }`}
                      >
                        <span>{option}</span>
                        {isSelected && <Check size={14} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSidebar;