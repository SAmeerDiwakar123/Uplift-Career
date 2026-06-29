import React from 'react';
import { Star, Users, Clock, BookOpen, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/course/${course?._id}`)}
      className="bg-white border border-gray-200 rounded hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col"
    >

      <div className="relative">
        {course?.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover rounded-t"/>
        ) : (
          <div className="w-full h-40 bg-indigo-50 flex items-center justify-center text-5xl rounded-t">
            📚
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <Play size={18} className="text-indigo-600 fill-indigo-600" />
          </div>
        </div>

        {course?.enrolledStudents?.length > 10 && (
          <span className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 bg-yellow-400 text-gray-900 rounded-sm">
            Bestseller </span>
        )}
      </div>

      <div className="p-3 flex flex-col gap-1.5 flex-1">

        <h3 className="font-bold text-sm text-gray-900 line-clamp-2 leading-snug">
          {course?.title}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2">
          {course?.description}
        </p>

        <p className="text-xs text-gray-500">
          {course?.instructor?.fullname}
        </p>

        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-yellow-700">
            {course?.rating > 0 ? course.rating.toFixed(1) : 'New'}
          </span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} size={11} className={star <= Math.round(course?.rating || 0)
                  ? 'fill-yellow-400 text-yellow-400': 'fill-gray-200 text-gray-200'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">
            ({course?.enrolledStudents?.length || 0})
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <BookOpen size={11} />
            {course?.lessons?.length || 0} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {course?.validityYears} yr
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} />
            {course?.enrolledStudents?.length || 0}
          </span>
        </div>

        <div className="flex-1" />

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          {course?.price === 0 ? (
            <span className="text-base font-bold text-green-600">Free</span>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ₹{course?.price?.toLocaleString()}
            </span>
          )}

          <span className={`text-xs px-2 py-0.5 font-medium rounded-sm ${
            course?.level === 'Beginner'
              ? 'bg-green-50 text-green-700'
              : course?.level === 'Intermediate'
              ? 'bg-yellow-50 text-yellow-700'
              : 'bg-red-50 text-red-700'
          }`}>
            {course?.level}
          </span>
        </div>

      </div>
    </div>
  );
};
export default CourseCard;