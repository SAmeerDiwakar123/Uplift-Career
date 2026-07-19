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
    <section className="py-8 sm:py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Explore Courses
            </h2>
            <p className="text-sm text-gray-500">Learn new skills from expert instructors</p>
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-1 transition-colors"
          >
            View all courses
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;