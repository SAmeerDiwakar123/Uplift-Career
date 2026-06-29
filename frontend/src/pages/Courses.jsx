import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Search, BookOpen } from 'lucide-react';
import useGetAllCourses from '../hooks/useGetAllCourses';
import Navbar from '../components/shared/Navbar';
import CourseCard from '../components/course/CourseCard';
import CourseFilterCard from '../components/course/CourseFilterCard';
import BottomNav from '@/components/shared/BottomNav';
import Footer from '@/components/shared/Footer';

const Courses = () => {
  useGetAllCourses();
  const courses = useSelector(store => store.course?.courses) ?? [];
  const filters = useSelector(store => store.course?.filters) ?? {};
  const [search, setSearch] = useState('');

  const filteredCourses = useMemo(() => {
    if (!courses || courses.length === 0) return [];

    return courses.filter(course => {
      if (!course) return false;

      const matchSearch = course.title?.toLowerCase().includes(search.toLowerCase());

      const matchCategory = filters.category
        ? course.category === filters.category
        : true;

      const matchLevel = filters.level
        ? course.level === filters.level
        : true;

      const matchPrice = filters.price
        ? filters.price === 'Free' ? course.price === 0
          : filters.price === 'Under ₹500' ? course.price < 500
            : filters.price === '₹500-₹1000' ? course.price >= 500 && course.price <= 1000
              : filters.price === '₹1000-₹2000' ? course.price > 1000 && course.price <= 2000
                : course.price > 2000
        : true;

      return matchSearch && matchCategory && matchLevel && matchPrice;
    });
  }, [courses, filters, search]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-20">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-blue-600 sm:size-6" />
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900">
              Explore Courses
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-sm w-full sm:w-72">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="text-sm text-slate-700 outline-none w-full bg-transparent placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex gap-4 sm:gap-6">

          {/* Sidebar Filter */}
          <div className="w-60 hidden lg:block shrink-0">
            <CourseFilterCard />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-5">
              {filteredCourses.length} courses found
            </p>

            {filteredCourses.length === 0 ? (
              <div className="text-center py-16 sm:py-20">
                <BookOpen size={40} className="mx-auto text-slate-300 mb-3 sm:mb-4" />
                <p className="text-sm text-slate-400">No courses found</p>
                <p className="text-xs text-slate-500 mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {filteredCourses.map(course => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

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
