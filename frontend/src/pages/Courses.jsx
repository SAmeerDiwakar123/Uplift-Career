// Courses.jsx
import React from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { Clock, Users, Star, BookOpen } from 'lucide-react';

const coursesArray = [1, 2, 3, 4, 5, 6];

const Courses = () => {

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 mt-6 flex-1 w-full">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 Courses</h1>
        <p className="text-sm text-gray-400 mb-6">Upgrade your skills with top courses</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">

              {/* Thumbnail */}
              <div className="bg-indigo-50 h-40 rounded-t-2xl flex items-center justify-center border-b border-gray-100">
                <BookOpen size={40} className="text-indigo-300" />
              </div>

              <div className="p-5 flex flex-col gap-3">

                {/* Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-3 py-1 rounded-full">
                    Web Development
                  </span>
                  <span className="text-xs bg-green-50 text-green-600 font-semibold px-3 py-1 rounded-full">
                    Free
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h2 className="text-base font-bold text-gray-900">Course Title</h2>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock size={12} />12 hours</span>
                  <span className="flex items-center gap-1"><Users size={12} />1.2k enrolled</span>
                  <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400" />4.8</span>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                    I
                  </div>
                  <span className="text-xs text-gray-500">Instructor Name</span>
                </div>

                {/* Button */}
                <button className="mt-1 w-full bg-indigo-600 text-white text-sm font-semibold py-2 rounded-xl hover:bg-indigo-700 transition">
                  Enroll Now
                </button>

              </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Courses;