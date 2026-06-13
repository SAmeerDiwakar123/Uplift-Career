import React, { useState } from 'react';
import { MapPin, Briefcase, Star, DollarSign, Building2, ChevronRight, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, setFilters } from '@/redux/jobSlice';

const filterData = [
  {
    icon: <MapPin size={15} />,
    title: 'Location',
    options: ['Delhi', 'Bangalore', 'Mumbai', 'Hyderabad', 'Remote', 'NCR'],
  },
  {
    icon: <Briefcase size={15} />,
    title: 'JobType',
    options: ['Full Time', 'Part Time', 'Internship', 'Freelance', 'Contract']
  },
  {
    icon: <Star size={15} />,
    title: 'Experience',
    options: ['Fresher', '1-2 Years', '3-5 Years', '5+ Years']
  },
  {
    icon: <DollarSign size={15} />,
    title: 'Salary',
    options: ['0-3 LPA', '3-6 LPA', '6-10 LPA', '10-20 LPA', '20+ LPA']
  },
  {
    icon: <Building2 size={15} />,
    title: 'Industry',
    options: ['IT & Software', 'Marketing', 'Finance', 'Design', 'HR', 'Sales']
  },
];

const FilterCard = () => {
  const [openFilter, setOpenFilter] = useState(null);
  
  const filters = useSelector((store) => store.job?.filters || {});
  const dispatch = useDispatch();

  const activeCount = Object.values(filters).filter(Boolean).length;

  const clearAll = () => {
    dispatch(clearFilter());
    setOpenFilter(null);
  };

  const toggleFilter = (title) => {
    setOpenFilter((prev) => (prev === title ? null : title));
  };

  const handleSelect = (title, option) => {
    dispatch(setFilters({ [title.toLowerCase()]: option }));
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

            {/* ✅ Curly braces lagaye — ab value render hogi, string nahi */}
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

export default FilterCard;








// // FilterCard.jsx
// import React, { useState } from 'react';
// import { MapPin, Briefcase, Star, DollarSign, Building2, ChevronRight ,X } from 'lucide-react';
// import { useDispatch, useSelector  } from 'react-redux';
// import { clearFilter, setFilters } from '@/redux/jobSlice';

// const filterData = [
//   { icon: <MapPin size={15} />,
//     title: 'Location',
//     options: ['Delhi', 'Bangalore', 'Mumbai', 'Hyderabad', 'Remote', 'NCR'],  
//   },
//   { icon: <Briefcase size={15} />, 
//     title: 'jobType',
//     options: ['Full Time', 'Part Time', 'Internship', 'Freelance', 'Contract'] 
//   },
//   { icon: <Star size={15} />,
//     title: 'Experience', options: ['Fresher', '1-2 Years', '3-5 Years', '5+ Years'] 
//   },
//   { icon: <DollarSign size={15} />, 
//   title: 'Salary', 
//   options: ['0-3 LPA', '3-6 LPA', '6-10 LPA', '10-20 LPA', '20+ LPA']
//  },
//   { icon: <Building2 size={15} />,
//     title: 'Industry',
//     options: ['IT & Software', 'Marketing', 'Finance', 'Design', 'HR', 'Sales'] 
//   },
// ];




// const FilterCard = () => {
  
//   const [openFilter, setOpenFilter] = useState(null);
//   const filters = useSelector(store => store.job.filters)
//   const dispatch = useDispatch();
  


//   const activeCount = Object.values(filters).filter(Boolean).length;

//   const clearAll = () => {
//     dispatch(clearFilter());
//     setOpenFilter(null);
//   }

//   const toggleFilter = (title) => {
//     setOpenFilter((prev) => (prev === title ? null : title));
//   }

//   const handleSelect = (title, option) => {
//     dispatch(setFilters({[title.toLowerCase()]: option}));
//     setOpenFilter(null)
//   }
 

//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-4 w-48 sticky top-6">

//       <div className="flex items-center justify-between mb-4">
//         <span className="text-xs font-bold text-gray-900 tracking-widest uppercase">Filters</span>
//         {
//           activeCount > 0 && (
//             <button onClick={clearAll} className='flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition'>
//               <X size={11}/> clear
//             </button>
//           )
//         }
//       </div>

//       <div className="flex flex-col gap-1">
//         {filterData.map((filter) => (
//           <div key={filter.title} className="relative">
//             <button onClick={() => toggleFilter(filter.title)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
//               openFilter === filter.title ? 'bg-indigo-600 text-white shadow-md'
//               : filters[filter.title.toLocaleLowerCase()]
//               ? 'bg-indigo-50 text-indigo-700'
//               : 'text-gray-600 hover:bg-gray-50'
//               }`}>
//               <div className="flex items-center gap-2">
//                 <span className="text-indigo-400">{filter.icon}</span>
//                 <span className="text-xs font-semibold">{filter.title}</span>
//               </div>
//               <ChevronRight size={13} className="text-gray-300" />
//             </button>
            
//             {
//               filters[filter.title.toLocaleLowerCase()] && openFilter !== filter.title && (
//                 <div className='mx-3 mb-1 mt-0.5 text-xs text-indigo-500 font-medium truncate'>
//                   ✓ filters[filter.title.toLocaleLowerCase()]
//                 </div>
//               )
//             }

//             { openFilter === filter.title && (
//               <div className='absolute left-full top-0 ml-3 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 p-2'>
//                 <p className='text-xs text-gray-400 font-semibold uppercase tracking-widest px-2 py-1.5'>
//                   {filter.title}
//                 </p>
//                 {
//                   filter.options.map((option) => (
//                     <button key={option} onClick={() => handleSelect(filter.title, option)} className='w-full text-left px-3 py-2 text-sm rounded-xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 transition'>
//                       {option}
//                     </button>
//                   ))
//                 }
//               </div>
//             )}

//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default FilterCard;