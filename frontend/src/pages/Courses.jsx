import React from 'react';
import Navbar from '../components/shared/Navbar';
import BottomNav from '@/components/shared/BottomNav';
import { Clock, Users, Star, BookOpen } from 'lucide-react';

const coursesArray = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn React from scratch with projects",
    category: "Web Development",
    price: "Free",
    duration: "12 hours",
    enrolled: "1.2k",
    rating: 4.8,
    instructor: "John Doe"
  },
  {
    id: 2,
    title: "Node.js Mastery",
    description: "Backend development with Node.js",
    category: "Backend",
    price: "Paid",
    duration: "20 hours",
    enrolled: "900",
    rating: 4.7,
    instructor: "Sarah"
  }
];

const Courses = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">

      <Navbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-3 sm:mt-6 flex-1 w-full">

        {/* Heading */}
        <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900">
          📚 Courses
        </h1>

        <p className="text-xs sm:text-sm text-gray-400 mt-1 mb-4 sm:mb-6">
          Upgrade your skills with top courses
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 pb-24">

          {coursesArray.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition hover:-translate-y-1 flex flex-col"
            >

              {/* Thumbnail (smaller on mobile) */}
              <div className="bg-indigo-50 h-24 sm:h-40 rounded-t-xl flex items-center justify-center border-b">
                <BookOpen size={28} className="text-indigo-300 sm:size-9" />
              </div>

              <div className="p-3 sm:p-5 flex flex-col gap-2 sm:gap-3">

                {/* Badge */}
                <div className="flex items-center justify-between">

                  <span className="text-[10px] sm:text-xs bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 sm:py-1 rounded-full">
                    {course.category}
                  </span>

                  <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:py-1 rounded-full ${
                    course.price === "Free"
                      ? "bg-green-50 text-green-600"
                      : "bg-yellow-50 text-yellow-600"
                  }`}>
                    {course.price}
                  </span>

                </div>

                {/* Title */}
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-gray-900">
                    {course.title}
                  </h2>

                  <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Meta (compact on mobile) */}
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500">

                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {course.duration}
                  </span>

                  <span className="flex items-center gap-1">
                    <Users size={10} />
                    {course.enrolled}
                  </span>

                  <span className="flex items-center gap-1">
                    <Star size={10} className="text-yellow-400" />
                    {course.rating}
                  </span>

                </div>

                {/* Instructor */}
                <div className="flex items-center gap-2">

                  <div className="h-5 w-5 sm:h-7 sm:w-7 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] sm:text-xs font-bold text-indigo-600">
                    {course.instructor.charAt(0)}
                  </div>

                  <span className="text-[10px] sm:text-xs text-gray-500">
                    {course.instructor}
                  </span>

                </div>

                {/* Button */}
                <button className="w-full bg-indigo-600 text-white text-xs font-semibold py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:bg-indigo-700 transition">
                  Enroll Now
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>

      <BottomNav />

    </div>
  );
};

export default Courses;