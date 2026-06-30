import React, { useState, useEffect } from 'react';
import {MapPin,Briefcase,Star,DollarSign,Building2,X,SlidersHorizontal,Check,ChevronDown,
  ChevronUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, setFilters } from '@/redux/jobSlice';

// ✅ Array ka naam alag do — `filterSections`
const filterSections = [
  {
    icon: <MapPin size={16} />,
    title: 'Location',
    key: 'location',
    options: ['Delhi', 'Bangalore', 'Mumbai', 'Hyderabad', 'Pune', 'Remote', 'NCR', 'Chennai'],
  },
  {
    icon: <Briefcase size={16} />,
    title: 'Job Type',
    key: 'jobtype',
    options: ['Full Time', 'Part Time', 'Internship', 'Freelance', 'Contract'],
  },
  {
    icon: <Star size={16} />,
    title: 'Experience',
    key: 'experience',
    options: ['Fresher', '1-2 Years', '3-5 Years', '5+ Years'],
  },
  {
    icon: <DollarSign size={16} />,
    title: 'Salary',
    key: 'salary',
    options: ['0-3 LPA', '3-6 LPA', '6-10 LPA', '10-20 LPA', '20+ LPA'],
  },
  {
    icon: <Building2 size={16} />,
    title: 'Industry',
    key: 'industry',
    options: ['IT & Software', 'Marketing', 'Finance', 'Design', 'HR', 'Sales'],
  },
];

// ✅ Component ka naam `FilterDrawer`
const FilterDrawer = ({ isOpen, onClose }) => {
  const [expanded, setExpanded] = useState([]);
  const filters = useSelector((store) => store.job?.filters || {});
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

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

  const applyFilters = () => {
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 h-full bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out
          w-full sm:w-3/4 md:w-1/2 lg:w-[450px] max-w-full
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-indigo-600" />
            <h2 className="text-base font-bold text-gray-900">Filters</h2>
            {activeCount > 0 && (
              <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {activeCount}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Active Chips */}
        {activeCount > 0 && (
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (!value) return null;
                const section = filterSections.find((s) => s.key === key);
                return (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-indigo-100"
                  >
                    {section?.icon}
                    {value}
                    <button onClick={() => dispatch(setFilters({ [key]: '' }))} className="ml-0.5 hover:text-red-500 transition">
                      <X size={12} />
                    </button>
                  </span>
                );
              })}
              <button onClick={clearAll} className="text-xs text-red-500 font-medium hover:text-red-600 px-1">
                Clear all
              </button>
            </div>
          </div>
        )}

        {/* Filter Sections */}
        <div className="overflow-y-auto h-[calc(100%-140px)] px-2 py-2">
          {filterSections.map((section) => {
            const isExpanded = expanded.includes(section.title);
            const selected = filters[section.key];

            return (
              <div key={section.key} className="mb-1">
                <button
                  onClick={() => toggleSection(section.title)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all ${
                    selected ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={selected ? 'text-indigo-600' : 'text-gray-400'}>
                      {section.icon}
                    </span>
                    <div>
                      <span className="text-sm font-semibold block">{section.title}</span>
                      {selected && <span className="text-[11px] text-indigo-500 font-medium">{selected}</span>}
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>

                <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-4 py-2 grid grid-cols-1 gap-1">
                    {section.options.map((option) => {
                      const isSelected = filters[section.key] === option;
                      return (
                        <button
                          key={option}
                          onClick={() => handleSelect(section.key, option)}
                          className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                            isSelected ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <span>{option}</span>
                          {isSelected && <Check size={14} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-3 flex gap-3">
          <button
            onClick={clearAll}
            disabled={activeCount === 0}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition ${
              activeCount > 0 ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Reset
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
};

// ✅ Component export karo
export default FilterDrawer;