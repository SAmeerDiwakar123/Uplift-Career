import { useState, useEffect } from 'react';
import { X, SlidersHorizontal, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, setFilters } from '@/redux/jobSlice';

const filterSections = [
  {
    title: 'Location',
    key: 'location',
    options: ['Delhi', 'Bangalore', 'Mumbai', 'Hyderabad', 'Pune', 'Remote', 'NCR', 'Chennai']
  },
  {
    title: 'Job Type',
    key: 'jobtype',
    options: ['Full Time', 'Part Time', 'Internship', 'Freelance', 'Contract']
  },
  {
    title: 'Experience',
    key: 'experience',
    options: ['Fresher', '1-2 Years', '3-5 Years', '5+ Years']
  },
  {
    title: 'Salary',
    key: 'salary',
    options: ['0-3 LPA', '3-6 LPA', '6-10 LPA', '10-20 LPA', '20+ LPA']
  },
  {
    title: 'Industry',
    key: 'industry',
    options: ['IT & Software', 'Marketing', 'Finance', 'Design', 'HR', 'Sales']
  }
];

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
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const activeCount = Object.values(filters).filter(Boolean).length;

  const toggleSection = (title) => {
    if (expanded.includes(title)) {
      setExpanded(expanded.filter((t) => t !== title));
    } else {
      setExpanded([...expanded, title]);
    }
  };

  const handleSelect = (key, option) => {
    if (filters[key] === option) {
      dispatch(setFilters({ [key]: '' }));
    } else {
      dispatch(setFilters({ [key]: option }));
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 left-0 h-full w-full sm:w-3/4 bg-white z-50 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-indigo-600" />
            <h2 className="text-base font-bold">Filters</h2>
            {activeCount > 0 && (
              <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                {activeCount}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-2">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Sections */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          {filterSections.map((section) => {
            const isExpanded = expanded.includes(section.title);
            const selected = filters[section.key];

            return (
              <div key={section.key} className="mb-1">
                <button
                  onClick={() => toggleSection(section.title)}
                  className={`w-full flex justify-between px-4 py-3.5 rounded-xl text-left ${
                    selected ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                  }`}
                >
                  <div>
                    <span className="text-sm font-semibold block">
                      {section.title}
                    </span>
                    {selected && (
                      <span className="text-[11px] text-indigo-500">
                        {selected}
                      </span>
                    )}
                  </div>
                  {isExpanded ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 py-2">
                    {section.options.map((option) => {
                      const isSelected = filters[section.key] === option;
                      return (
                        <button
                          key={option}
                          onClick={() => handleSelect(section.key, option)}
                          className={`w-full flex justify-between text-left px-3 py-2.5 rounded-lg text-sm ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {option}
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

        {/* Footer */}
        <div className="border-t px-5 py-3 flex gap-3">
          <button
            onClick={() => dispatch(clearFilter())}
            disabled={activeCount === 0}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-300 text-gray-700 disabled:opacity-50"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;