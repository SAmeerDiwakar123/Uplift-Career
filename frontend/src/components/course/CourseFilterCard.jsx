import React, { useState } from 'react';
import { BookOpen, BarChart2, Tag, ChevronRight, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseFilters, clearCourseFilters } from "../../redux/courseSlice"
const filterData = [
  {
    icon: <Tag size={15} />,
    title: 'Category',
    options: ['Web Development', 'Data Science', 'Design', 'Marketing', 'Finance', 'Photography'],
  },
  {
    icon: <BarChart2 size={15} />,
    title: 'Level',
    options: ['Beginner', 'Intermediate', 'Advance'],
  },
  {
    icon: <BookOpen size={15} />,
    title: 'Price',
    options: ['Free', 'Under ₹500', '₹500-₹1000', '₹1000-₹2000', 'Above ₹2000'],
  },
];

const CourseFilterCard = () => {
  const [openFilter, setOpenFilter] = useState(null);
  const filters = useSelector(store => store.course?.filters) ?? {};
  const dispatch = useDispatch();

  const activeCount = Object.values(filters).filter(Boolean).length;

  const clearAll = () => {
    dispatch(clearCourseFilters());
    setOpenFilter(null);
  };

  const toggleFilter = (title) => {
    setOpenFilter(prev => prev === title ? null : title);
  };

  const handleSelect = (title, option) => {
    dispatch(setCourseFilters({ [title.toLowerCase()]: option }));
    setOpenFilter(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-4 w-48 sticky top-6">

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-gray-900 tracking-widest uppercase">Filters</span>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition"
          >
            <X size={11} /> clear
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {filterData.map((filter) => (
          <div key={filter.title} className="relative">
            <button
              onClick={() => toggleFilter(filter.title)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                openFilter === filter.title
                  ? 'bg-indigo-600 text-white shadow-md'
                  : filters[filter.title.toLowerCase()]
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={openFilter === filter.title ? 'text-white' : 'text-indigo-400'}>
                  {filter.icon}
                </span>
                <span className="text-xs font-semibold">{filter.title}</span>
              </div>
              <ChevronRight
                size={13}
                className={`transition-transform duration-200 ${
                  openFilter === filter.title ? 'rotate-90 text-white' : 'text-gray-300'
                }`}
              />
            </button>

            {filters[filter.title.toLowerCase()] && openFilter !== filter.title && (
              <div className="mx-3 mb-1 mt-0.5 text-xs text-indigo-500 font-medium truncate">
                ✓ {filters[filter.title.toLowerCase()]}
              </div>
            )}

            {openFilter === filter.title && (
              <div className="absolute left-full top-0 ml-3 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 p-2">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest px-2 py-1.5">
                  {filter.title}
                </p>
                {filter.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(filter.title, option)}
                    className="w-full text-left px-3 py-2 text-sm rounded-xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseFilterCard;