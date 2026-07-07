import { useState, useEffect } from 'react';
import { X, Check, Search, ChevronDown } from 'lucide-react';

const filterConfig = [
  {
    key: 'location',
    title: 'Location',
    options: ['Remote', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi NCR', 'Pune', 'Chennai', 'Gurgaon', 'Noida', 'Kolkata']
  },
  {
    key: 'jobType',
    title: 'Job Type',
    options: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance']
  },
  {
    key: 'experience',
    title: 'Experience',
    options: ['Fresher (0-1 yr)', 'Junior (1-3 yrs)', 'Mid (3-5 yrs)', 'Senior (5-8 yrs)', 'Lead (8+ yrs)']
  },
  {
    key: 'salary',
    title: 'Salary',
    options: ['0-3 LPA', '3-6 LPA', '6-10 LPA', '10-20 LPA', '20+ LPA']
  },
  {
    key: 'industry',
    title: 'Industry',
    options: ['IT Services', 'Product', 'FinTech', 'E-commerce', 'Healthcare', 'EdTech', 'SaaS', 'AI/ML']
  }
];

const FilterDrawer = ({ isOpen, onClose, filters, onFilterChange, onClearAll }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [searchTerms, setSearchTerms] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setExpandedSections({});
      setSearchTerms({});
    }
  }, [isOpen]);

  const toggleSection = (key) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelect = (key, value) => {
    const currentValues = Array.isArray(filters?.[key]) ? filters[key] : [];
    let newValues;

    if (currentValues.includes(value)) {
      newValues = currentValues.filter((v) => v !== value);
    } else {
      newValues = [...currentValues, value];
    }

    onFilterChange({
      ...filters,
      [key]: newValues
    });
  };

  const handleSearchChange = (key, value) => {
    setSearchTerms(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const activeCount = Object.values(filters || {}).reduce((acc, curr) => {
    return acc + (Array.isArray(curr) ? curr.length : 0);
  }, 0);

  const getActiveFilters = () => {
    const active = [];
    filterConfig.forEach(section => {
      const values = Array.isArray(filters?.[section.key]) ? filters[section.key] : [];
      if (values.length > 0) {
        values.forEach(val => {
          active.push({ key: section.key, title: section.title, value: val });
        });
      }
    });
    return active;
  };

  const activeFilters = getActiveFilters();

  return (
    <>
      {/* 🔥 Overlay with blur */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      >
        {/* Blur background */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />
      </div>

      {/* Drawer */}
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10 px-4 py-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            <p className="text-xs text-gray-500">{activeCount} filters active</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Active Filters Chips */}
        {activeFilters.length > 0 && (
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <div className="flex flex-wrap gap-1.5">
              {activeFilters.map(({ key, title, value }) => (
                <span 
                  key={`${key}-${value}`} 
                  className="flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs px-2.5 py-1 rounded-full font-medium"
                >
                  {title}: {value}
                  <button 
                    onClick={() => handleSelect(key, value)}
                    className="ml-0.5 hover:bg-indigo-200 rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Filter List */}
        <div className="overflow-y-auto h-[calc(100%-180px)] pb-4 px-4">
          {filterConfig.map((section) => {
            const isExpanded = expandedSections[section.key] || false;
            const selectedValues = Array.isArray(filters?.[section.key]) ? filters[section.key] : [];
            const searchTerm = searchTerms[section.key] || '';
            
            const filteredOptions = section.options.filter(opt => 
              opt.toLowerCase().includes(searchTerm.toLowerCase())
            );

            return (
              <div key={section.key} className="border-b border-gray-100 py-3">
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full flex items-center justify-between py-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">{section.title}</span>
                    {selectedValues.length > 0 && (
                      <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {selectedValues.length}
                      </span>
                    )}
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`text-gray-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <>
                    <div className="mt-2 mb-1">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-200">
                        <Search size={14} className="text-gray-400" />
                        <input
                          type="text"
                          placeholder={`Search ${section.title}...`}
                          value={searchTerm}
                          onChange={(e) => handleSearchChange(section.key, e.target.value)}
                          className="text-xs outline-none bg-transparent w-full text-gray-700 placeholder-gray-400"
                        />
                        {searchTerm && (
                          <button onClick={() => handleSearchChange(section.key, '')}>
                            <X size={12} className="text-gray-400 hover:text-gray-600" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 space-y-1 max-h-48 overflow-y-auto">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((opt) => {
                          const isSelected = selectedValues.includes(opt);
                          return (
                            <button
                              key={opt}
                              onClick={() => handleSelect(section.key, opt)}
                              className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-3 transition-colors ${
                                isSelected
                                  ? 'bg-indigo-50 text-indigo-700'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <span className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-all ${
                                isSelected 
                                  ? 'border-indigo-500 bg-indigo-500 text-white' 
                                  : 'border-gray-300 bg-white'
                              }`}>
                                {isSelected && <Check size={12} strokeWidth={3} />}
                              </span>
                              <span className="text-sm">{opt}</span>
                            </button>
                          );
                        })
                      ) : (
                        <div className="text-center py-4 text-sm text-gray-400">No options found</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white border-t border-gray-200 p-4 flex gap-3">
          <button
            onClick={onClearAll}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;