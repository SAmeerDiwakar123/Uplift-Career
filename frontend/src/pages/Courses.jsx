import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGetAllCourses from '../hooks/useGetAllCourses';
import Navbar from '../components/shared/Navbar';
import CourseCard from '../components/course/CourseCard';
import CourseFilterCard from '../components/course/CourseFilterCard';
import BottomNav from '@/components/shared/BottomNav';

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 mt-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-sm sm:text-2xl font-bold text-gray-900">📚 Explore Courses</h1>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-64">
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="text-sm text-gray-700 outline-none w-full bg-transparent"
            />
          </div>
        </div>

        <div className="flex gap-6">

          <div className="w-1/4 hidden md:block">
            <CourseFilterCard />
          </div>

          <div className="flex-1 pb-10">
            <p className="text-xs text-gray-400 mb-4">
              {filteredCourses.length} courses found
            </p>

            {filteredCourses.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-4">📭</div>
                <p>No courses found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
      <BottomNav/>
    </div>
  );
};

export default Courses;
