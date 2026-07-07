import { useState, useRef, useEffect } from 'react';
import { X, Check, Search } from 'lucide-react';

const filterConfig = [
  {
    key: 'location',
    title: 'Location',
    options: ['Remote', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi NCR', 'Pune', 'Chennai', 'Gurgaon', 'Noida', 'Kolkata']
  },
  {
    key: 'profile',
    title: 'Profile',
    options: ['Frontend', 'Backend', 'Full Stack', 'DevOps', 'Data Science', 'AI/ML', 'Product', 'Marketing', 'Finance']
  },
  {
    key: 'stipend',
    title: 'Stipend',
    options: ['Unpaid', '0-5k', '5k-10k', '10k-20k', '20k-50k', '50k+']
  },
  {
    key: 'duration',
    title: 'Duration',
    options: ['1 month', '2 months', '3 months', '4 months', '6 months']
  },
  {
    key: 'mode',
    title: 'Mode',
    options: ['Remote', 'In-Office', 'Hybrid']
  }
];

const HoverFilterPanel = ({ filters, onFilterChange, onClearAll }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSearchTerm('');
  }, [openDropdown]);

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

  const handleRemoveChip = (key, value) => {
    const currentValues = Array.isArray(filters?.[key]) ? filters[key] : [];
    const newValues = currentValues.filter((v) => v !== value);
    
    onFilterChange({
      ...filters,
      [key]: newValues
    });
  };

  const activeCount = Object.values(filters || {}).reduce((acc, curr) => {
    return acc + (Array.isArray(curr) ? curr.length : 0);
  }, 0);

  return (
    <>
      {openDropdown && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-all duration-200"
          onClick={() => setOpenDropdown(null)}
        />
      )}

      <div className="bg-white border border-gray-200 z-40 shadow-sm rounded-xl relative" ref={panelRef}>
        <div className="max-w-7xl mx-auto px-3">
          
          <div className="flex items-center gap-2 py-2 flex-wrap">
            {filterConfig.map((section) => {
              const isOpen = openDropdown === section.key;
              const selectedValues = Array.isArray(filters?.[section.key]) ? filters[section.key] : [];
              const isSelected = selectedValues.length > 0;

              const filteredOptions = section.options.filter(opt => 
                opt.toLowerCase().includes(searchTerm.toLowerCase())
              );

              return (
                <div key={section.key} className="relative">
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : section.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm'
                        : isOpen
                        ? 'bg-gray-100 text-gray-800 border-gray-300'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {section.title}
                    {isSelected ? (
                      <span className="bg-indigo-600 text-white text-[10px] px-1.5 h-4 rounded-full flex items-center justify-center font-bold">
                        {selectedValues.length}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-[10px]">▼</span>
                    )}
                  </button>

                  {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl border border-gray-200 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                      
                      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-700">Select {section.title}</span>
                        <button onClick={() => setOpenDropdown(null)} className="text-gray-400 hover:text-gray-600">
                          <X size={14} />
                        </button>
                      </div>

                      <div className="p-2 border-b border-gray-100 bg-white flex items-center gap-2">
                        <Search size={14} className="text-gray-400 ml-1 flex-shrink-0" />
                        <input
                          type="text"
                          placeholder={`Search ${section.title.toLowerCase()}...`}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full text-xs outline-none bg-transparent py-1 text-gray-700 placeholder-gray-400"
                        />
                        {searchTerm && (
                          <button onClick={() => setSearchTerm('')}>
                            <X size={12} className="text-gray-400 hover:text-gray-600" />
                          </button>
                        )}
                      </div>

                      <div className="py-1 max-h-[240px] overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                          filteredOptions.map((opt) => {
                            const isOptionSelected = selectedValues.includes(opt);
                            return (
                              <button
                                key={opt}
                                onClick={() => handleSelect(section.key, opt)}
                                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
                                  isOptionSelected
                                    ? 'bg-indigo-50/70 text-indigo-700 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                                  isOptionSelected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300 bg-white'
                                }`}>
                                  {isOptionSelected && <Check size={10} className="text-white" strokeWidth={3} />}
                                </div>
                                <span className="text-xs">{opt}</span>
                              </button>
                            );
                          })
                        ) : (
                          <div className="text-center py-4 text-xs text-gray-400">No results found</div>
                        )}
                      </div>

                    </div>
                  )}
                </div>
              );
            })}

            {activeCount > 0 && (
              <button onClick={onClearAll} className="text-xs text-red-500 font-semibold hover:text-red-600 ml-2">
                Clear all
              </button>
            )}
          </div>

          {activeCount > 0 && (
            <div className="flex items-center gap-1.5 py-2 border-t border-gray-100 overflow-x-auto scrollbar-hide flex-wrap">
              {Object.entries(filters || {}).map(([key, values]) => {
                if (!Array.isArray(values) || values.length === 0) return null;
                const section = filterConfig.find((s) => s.key === key);
                
                return values.map((val) => (
                  <span key={`${key}-${val}`} className="flex items-center gap-1 bg-indigo-50 text-indigo-700 text-[10px] px-2 py-0.5 rounded-md border border-indigo-100 font-medium">
                    {section?.title}: {val}
                    <button onClick={() => handleRemoveChip(key, val)} className="ml-0.5 hover:bg-indigo-200 text-indigo-500 rounded p-0.5">
                      <X size={10} />
                    </button>
                  </span>
                ));
              })}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default HoverFilterPanel;