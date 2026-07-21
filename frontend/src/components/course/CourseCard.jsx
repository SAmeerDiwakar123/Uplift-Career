import React, { useState } from 'react';
import { Clock, Users, Bookmark, Play, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { COURSE_API_END_POINT } from '@/utils/constant';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [enrolling, setEnrolling] = useState(false);

  // Check if already enrolled
  const isEnrolled = course?.enrolledStudents?.some((student) => student === user?._id) || false;

  // Helper function
  const daysAgo = (time) => {
    if (!time) return 0;
    const diff = new Date() - new Date(time);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  // Enroll handler
  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      const res = await axios.post(
        `${COURSE_API_END_POINT}/enroll/${course._id}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Enrolled successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setEnrolling(false);
    }
  };

  const isBeginner = !course?.level || course?.level === 'Beginner';

  return (
    <div className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition group">
      {/* Thumbnail */}
      <div className="relative h-36 bg-gray-100">
        {course?.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-indigo-50 to-blue-50">
            📚
          </div>
        )}
        
        {/* Badges on thumbnail */}
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          {course?.price === 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-green-500 text-white rounded">
              FREE
            </span>
          )}
          {course?.enrolledStudents?.length > 50 && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-yellow-400 text-gray-900 rounded">
              BESTSELLER
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2">
        {/* Category + Save */}
        <div className="flex items-center justify-between">
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
            {course?.category || "Course"}
          </span>
          <button className="w-7 h-7 rounded-full border flex items-center justify-center text-gray-400 hover:text-indigo-600 transition">
            <Bookmark size={14} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
          {course?.title}
        </h3>

        {/* Instructor */}
        <p className="text-xs text-gray-500">
          {course?.instructor?.fullname || "Instructor"}
        </p>

        {/* Details */}
        <div className="flex gap-3 text-xs text-gray-500 flex-wrap">
          <span className="flex items-center gap-1">
            <GraduationCap size={12} /> {course?.level || "All levels"}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} /> {course?.enrolledStudents?.length || 0}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {daysAgo(course?.createdAt) === 0 ? "Today" : `${daysAgo(course?.createdAt)}d`}
          </span>
        </div>

        {/* Lessons & Validity */}
        <div className="flex gap-2">
          <div className="flex-1 bg-gray-50 rounded-lg px-2 py-1.5 text-center">
            <span className="text-[10px] text-gray-500">Lessons</span>
            <p className="text-xs font-semibold text-indigo-600">
              {course?.lessons?.length || 0}
            </p>
          </div>
          <div className="flex-1 bg-blue-50 rounded-lg px-2 py-1.5 text-center">
            <span className="text-[10px] text-gray-500">Access</span>
            <p className="text-xs font-semibold text-blue-600">
              {course?.validityYears || 1}Yr
            </p>
          </div>
        </div>

        {/* Price & Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            {course?.price === 0 ? (
              <span className="text-sm font-bold text-green-600">Free</span>
            ) : (
              <span className="text-sm font-bold text-gray-900">
                ₹{course?.price?.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => navigate(`/course/${course?._id}`)}
              className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-indigo-700"
            >
              View
            </button>
            <button
              onClick={handleEnroll}
              disabled={isEnrolled || enrolling}
              className={`px-3 py-1.5 border rounded-lg text-xs ${
                isEnrolled
                  ? "bg-green-50 text-green-600 border-green-200 cursor-default"
                  : "hover:border-indigo-500 hover:text-indigo-600"
              }`}
            >
              {isEnrolled ? "Enrolled" : "Enroll"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;




// import React from 'react';
// import { Star, Users, Clock, BookOpen, Play } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const CourseCard = ({ course }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       onClick={() => navigate(`/course/${course?._id}`)}
//       className="bg-white border border-gray-200 rounded hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col"
//     >

//       <div className="relative">
//         {course?.thumbnail ? (
//           <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover rounded-t"/>
//         ) : (
//           <div className="w-full h-40 bg-indigo-50 flex items-center justify-center text-5xl rounded-t">
//             📚
//           </div>
//         )}

//         <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
//           <div className="bg-white rounded-full p-3 shadow-lg">
//             <Play size={18} className="text-indigo-600 fill-indigo-600" />
//           </div>
//         </div>

//         {course?.enrolledStudents?.length > 10 && (
//           <span className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 bg-yellow-400 text-gray-900 rounded-sm">
//             Bestseller </span>
//         )}
//       </div>

//       <div className="p-3 flex flex-col gap-1.5 flex-1">

//         <h3 className="font-bold text-sm text-gray-900 line-clamp-2 leading-snug">
//           {course?.title}
//         </h3>

//         <p className="text-xs text-gray-500 line-clamp-2">
//           {course?.description}
//         </p>

//         <p className="text-xs text-gray-500">
//           {course?.instructor?.fullname}
//         </p>

//         <div className="flex items-center gap-1">
//           <span className="text-xs font-bold text-yellow-700">
//             {course?.rating > 0 ? course.rating.toFixed(1) : 'New'}
//           </span>
//           <div className="flex gap-0.5">
//             {[1, 2, 3, 4, 5].map(star => (
//               <Star key={star} size={11} className={star <= Math.round(course?.rating || 0)
//                   ? 'fill-yellow-400 text-yellow-400': 'fill-gray-200 text-gray-200'}
//               />
//             ))}
//           </div>
//           <span className="text-xs text-gray-400">
//             ({course?.enrolledStudents?.length || 0})
//           </span>
//         </div>

//         <div className="flex items-center gap-3 text-xs text-gray-400">
//           <span className="flex items-center gap-1">
//             <BookOpen size={11} />
//             {course?.lessons?.length || 0} lessons
//           </span>
//           <span className="flex items-center gap-1">
//             <Clock size={11} />
//             {course?.validityYears} yr
//           </span>
//           <span className="flex items-center gap-1">
//             <Users size={11} />
//             {course?.enrolledStudents?.length || 0}
//           </span>
//         </div>

//         <div className="flex-1" />

//         <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//           {course?.price === 0 ? (
//             <span className="text-base font-bold text-green-600">Free</span>
//           ) : (
//             <span className="text-lg font-bold text-gray-900">
//               ₹{course?.price?.toLocaleString()}
//             </span>
//           )}

//           <span className={`text-xs px-2 py-0.5 font-medium rounded-sm ${
//             course?.level === 'Beginner'
//               ? 'bg-green-50 text-green-700'
//               : course?.level === 'Intermediate'
//               ? 'bg-yellow-50 text-yellow-700'
//               : 'bg-red-50 text-red-700'
//           }`}>
//             {course?.level}
//           </span>
//         </div>

//       </div>
//     </div>
//   );
// };
// export default CourseCard;