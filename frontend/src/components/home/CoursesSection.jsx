import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import useGetAllCourses from '@/hooks/useGetAllCourses';
import CourseCard from '@/components/course/CourseCard';

const CoursesSection = () => {
  const navigate = useNavigate();
  useGetAllCourses();
  const courses = useSelector(store => store.course?.courses) ?? [];
  
  const topCourses = courses.slice(0, 4);

  return (
    <section className="py-8 sm:py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-5 sm:mb-8">
          <div>
            <h2 className="text-lg sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <span>📚 Trending</span>
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Courses</span>
              <Sparkles size={20} className="text-amber-500" />
            </h2>
            <p className="text-sm text-gray-500 mt-1">Learn from the best</p>
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="group flex items-center gap-2 text-xs sm:text-base text-amber-600 font-medium hover:text-amber-700 transition-colors"
          >
            See all
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;