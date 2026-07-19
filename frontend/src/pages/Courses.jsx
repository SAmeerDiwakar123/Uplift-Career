import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Search, BookOpen, X } from 'lucide-react';
import useGetAllCourses from '../hooks/useGetAllCourses';
import Navbar from '../components/shared/Navbar';
import CourseCard from '../components/course/CourseCard';
import BottomNav from '@/components/shared/BottomNav';
import Footer from '@/components/shared/Footer';

const Courses = () => {
  useGetAllCourses();
  const courses = useSelector(store => store.course?.courses) ?? [];
  const [search, setSearch] = useState('');


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-2 sm:px-4 mt-4 flex-1 w-full pb-24">
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <div className="hidden sm:block text-sm text-gray-500 whitespace-nowrap">
            <span className="font-semibold text-gray-700">{courses.length}</span> courses found
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search Box */}
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3 py-2 w-full sm:w-72 shadow-sm">
              <Search size={15} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="text-sm outline-none w-full bg-transparent text-gray-700 placeholder-gray-400 min-w-0"
              />
              {search && (
                <button onClick={handleClear} aria-label="Clear search" className="flex-shrink-0">
                  <X size={14} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {courses.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <BookOpen size={40} className="mx-auto text-gray-300 mb-3 sm:mb-4" />
              <p className="text-sm text-gray-400">No courses found</p>
              <p className="text-xs text-gray-500 mt-1">Try adjusting your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              {courses.map(course => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Courses;






// import React, { useState, useMemo } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import useGetAllCourses from '../hooks/useGetAllCourses';
// import Navbar from '../components/shared/Navbar';
// import CourseCard from '../components/course/CourseCard';
// import CourseFilterCard from '../components/course/CourseFilterCard';
// import BottomNav from '@/components/shared/BottomNav';
// import Footer from '@/components/shared/Footer';

// const Courses = () => {
//   useGetAllCourses();
//   const courses = useSelector(store => store.course?.courses) ?? [];
//   const filters = useSelector(store => store.course?.filters) ?? {};
//   const [search, setSearch] = useState('');

//   const filteredCourses = useMemo(() => {
//     if (!courses || courses.length === 0) return [];

//     return courses.filter(course => {
//       if (!course) return false;

//       const matchSearch = course.title?.toLowerCase().includes(search.toLowerCase());

//       const matchCategory = filters.category
//         ? course.category === filters.category
//         : true;

//       const matchLevel = filters.level
//         ? course.level === filters.level
//         : true;

//       const matchPrice = filters.price
//         ? filters.price === 'Free' ? course.price === 0
//           : filters.price === 'Under ₹500' ? course.price < 500
//             : filters.price === '₹500-₹1000' ? course.price >= 500 && course.price <= 1000
//               : filters.price === '₹1000-₹2000' ? course.price > 1000 && course.price <= 2000
//                 : course.price > 2000
//         : true;

//       return matchSearch && matchCategory && matchLevel && matchPrice;
//     });
//   }, [courses, filters, search]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 mt-6">

//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-sm sm:text-2xl font-bold text-gray-900">📚 Explore Courses</h1>
//           <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-64">
//             <input
//               type="text"
//               placeholder="Search courses..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               className="text-sm text-gray-700 outline-none w-full bg-transparent"
//             />
//           </div>
//         </div>

//         <div className="flex gap-6">

//           <div className="w-1/4 hidden md:block">
//             <CourseFilterCard />
//           </div>

//           <div className="flex-1 pb-10">
//             <p className="text-xs text-gray-400 mb-4">
//               {filteredCourses.length} courses found
//             </p>

//             {filteredCourses.length === 0 ? (
//               <div className="text-center py-16 text-gray-400">
//                 <div className="text-5xl mb-4">📭</div>
//                 <p>No courses found</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {filteredCourses.map(course => (
//                   <CourseCard key={course._id} course={course} />
//                 ))}
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//       <Footer/>
//       <BottomNav/>
//     </div>
//   );
// };

// export default Courses;
