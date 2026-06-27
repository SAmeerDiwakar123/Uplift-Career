import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Star, BookOpen, Play, Lock } from 'lucide-react';

// Hooks
import useGetCourseById from '@/hooks/useGetCourseById';
import useRazorpay from '@/hooks/useRazorpay';

// Components
import CoursePurchaseCard from '@/components/course/CoursePurchaseCard';
import VideoPlayer from '@/components/VideoPlayer';
import BottomNav from '@/components/shared/BottomNav';
import Footer from '@/components/shared/Footer';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  // Data fetch
  const { course, loading } = useGetCourseById(id, setIsEnrolled);

  // Payment
  const { handleBuyNow, paymentLoading } = useRazorpay(id, setIsEnrolled);

  // Video watch handler
  const handleWatchVideo = (lesson) => {
    if (lesson.videoUrl) {
      setSelectedLesson(lesson);
      setShowVideo(true);
    } else {
      alert('No video available for this lesson');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors mb-6"
        >
          <ArrowLeft size={15} /> Back to Courses
        </button>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Course Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {/* Category & Level Tags */}
              <div className="flex items-center gap-2 mb-3">
                <span 
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: '#EEEDFE', color: '#534AB7' }}
                >
                  {course.category || 'General'}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                  {course.level || 'All Levels'}
                </span>
              </div>

              {/* Title & Description */}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {course.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Star size={13} className="text-yellow-500 fill-yellow-500" />
                  {course.rating || 0} rating
                </span>
                <span className="flex items-center gap-1">
                  <Users size={13} />
                  {course.enrolledStudents?.length || 0} students
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={13} />
                  {course.lessons?.length || 0} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  Valid for {course.validityYears || 1} year
                </span>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                  {course.instructor?.fullname?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {course.instructor?.fullname || 'Unknown Instructor'}
                  </p>
                  <p className="text-xs text-gray-500">Instructor</p>
                </div>
              </div>
            </div>

            {/* Syllabus */}
            {course.syllabus?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3">What you'll learn</h2>
                <div className="grid grid-cols-2 gap-2">
                  {course.syllabus.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 font-bold">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Content - Lessons with Watch Button */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Course content</h2>
              <div className="space-y-2">
                {course.lessons?.length > 0 ? (
                  course.lessons.map((lesson, i) => {
                    const canWatch = lesson.isFreePreview || isEnrolled;
                    
                    return (
                      <div
                        key={lesson._id || i}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                            canWatch ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-500'
                          }`}>
                            {i + 1}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{lesson.title}</p>
                            {lesson.duration && (
                              <p className="text-xs text-gray-400">{lesson.duration}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Free Preview Badge */}
                          {lesson.isFreePreview && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                              Free Preview
                            </span>
                          )}

                          {/* Watch Button or Lock */}
                          {canWatch ? (
                            <button
                              onClick={() => handleWatchVideo(lesson)}
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                            >
                              <Play size={14} /> Watch
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 text-gray-400">
                              <Lock size={14} />
                              <span className="text-xs">Locked</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500">No lessons available</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Card */}
          <div className="space-y-4">
            <CoursePurchaseCard
              course={course}
              isEnrolled={isEnrolled}
              handleBuyNow={handleBuyNow}
              paymentLoading={paymentLoading}
            />
          </div>

        </div>
      </div>

      {/* Video Modal */}
      {showVideo && selectedLesson && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowVideo(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{selectedLesson.title}</h3>
              <button
                onClick={() => setShowVideo(false)}
                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <VideoPlayer 
                videoUrl={selectedLesson.videoUrl} 
                title={selectedLesson.title}
                onClose={() => setShowVideo(false)}
              />
            </div>
          </div>
        </div>
      )}
      <BottomNav/>
      <Footer/>
    </div>
  );
};

export default CourseDetail;






// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, Clock, Users, Star, BookOpen } from 'lucide-react';

// // Hooks
// import useGetCourseById from '@/hooks/useGetCourseById';
// import useRazorpay from '@/hooks/useRazorpay';

// // Components
// import CoursePurchaseCard from '@/components/course/CoursePurchaseCard';

// const CourseDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [isEnrolled, setIsEnrolled] = useState(false);

//   // Data fetch
//   const { course, loading } = useGetCourseById(id, setIsEnrolled);

//   // Payment
//   const { handleBuyNow, paymentLoading } = useRazorpay(id, setIsEnrolled);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500 text-lg">Loading course...</p>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500 text-lg">Course not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-5xl mx-auto px-4">

//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors mb-6"
//         >
//           <ArrowLeft size={15} /> Back to Courses
//         </button>

//         <div className="grid lg:grid-cols-3 gap-6">

//           {/* Left Column - Course Details */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* Course Info Card */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               {/* Category & Level Tags */}
//               <div className="flex items-center gap-2 mb-3">
//                 <span 
//                   className="text-xs px-2.5 py-1 rounded-full font-medium"
//                   style={{ background: '#EEEDFE', color: '#534AB7' }}
//                 >
//                   {course.category || 'General'}
//                 </span>
//                 <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
//                   {course.level || 'All Levels'}
//                 </span>
//               </div>

//               {/* Title & Description */}
//               <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
//               <p className="text-sm text-gray-600 leading-relaxed mb-4">
//                 {course.description}
//               </p>

//               {/* Stats */}
//               <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-4">
//                 <span className="flex items-center gap-1">
//                   <Star size={13} className="text-yellow-500 fill-yellow-500" />
//                   {course.rating || 0} rating
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Users size={13} />
//                   {course.enrolledStudents?.length || 0} students
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <BookOpen size={13} />
//                   {course.lessons?.length || 0} lessons
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Clock size={13} />
//                   Valid for {course.validityYears || 1} year
//                 </span>
//               </div>

//               {/* Instructor */}
//               <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
//                 <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
//                   {course.instructor?.fullname?.charAt(0) || 'U'}
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-800">
//                     {course.instructor?.fullname || 'Unknown Instructor'}
//                   </p>
//                   <p className="text-xs text-gray-500">Instructor</p>
//                 </div>
//               </div>
//             </div>

//             {/* Syllabus */}
//             {course.syllabus?.length > 0 && (
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                 <h2 className="text-lg font-bold text-gray-900 mb-3">What you'll learn</h2>
//                 <div className="grid grid-cols-2 gap-2">
//                   {course.syllabus.map((item, i) => (
//                     <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
//                       <span className="text-green-500 font-bold">✓</span>
//                       {item}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Course Content - Lessons */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//               <h2 className="text-lg font-bold text-gray-900 mb-3">Course content</h2>
//               <div className="space-y-2">
//                 {course.lessons?.length > 0 ? (
//                   course.lessons.map((lesson, i) => (
//                     <div
//                       key={lesson._id || i}
//                       className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
//                           {i + 1}
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-800">{lesson.title}</p>
//                           {lesson.duration && (
//                             <p className="text-xs text-gray-400">{lesson.duration}</p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-sm text-gray-500">No lessons available</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Purchase Card */}
//           <div className="space-y-4">
//             <CoursePurchaseCard
//               course={course}
//               isEnrolled={isEnrolled}
//               handleBuyNow={handleBuyNow}
//               paymentLoading={paymentLoading}
//             />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;