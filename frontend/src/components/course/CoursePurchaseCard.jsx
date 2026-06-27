// components/course/CoursePurchaseCard.jsx
import React from 'react';
import { Play, Clock, CheckCircle, BookOpen, Lock } from 'lucide-react';

const CoursePurchaseCard = ({ course, isEnrolled, handleBuyNow, paymentLoading }) => {
  const features = [
    [`${course.lessons?.length || 0} video lessons`, <Play size={13} className="text-gray-400" />],
    [`Valid for ${course.validityYears || 1} year`, <Clock size={13} className="text-gray-400" />],
    ['Certificate of completion', <CheckCircle size={13} className="text-gray-400" />],
    ['Full lifetime access', <BookOpen size={13} className="text-gray-400" />],
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-20">
      {/* Thumbnail */}
      {course.thumbnail ? (
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-36 object-cover rounded-lg mb-4"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <div 
          className="w-full h-36 rounded-lg mb-4 flex items-center justify-center text-5xl"
          style={{ background: '#EEEDFE' }}
        >
          📚
        </div>
      )}

      {/* Price */}
      <div className="mb-4">
        <span className="text-3xl font-bold text-gray-900">
          ₹{course.price?.toLocaleString() || 0}
        </span>
      </div>

      {/* Buy Button */}
      {isEnrolled ? (
        <button
          disabled
          className="w-full py-3 rounded-lg font-medium text-white bg-green-500 cursor-default"
        >
          ✓ Enrolled
        </button>
      ) : (
        <button
          onClick={handleBuyNow}
          disabled={paymentLoading}
          className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${
            paymentLoading
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {paymentLoading ? 'Processing...' : `Buy Now — ₹${course.price?.toLocaleString() || 0}`}
        </button>
      )}

      {/* Features */}
      <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">This course includes:</p>
        {features.map(([text, icon]) => (
          <div key={text} className="flex items-center gap-2 text-sm text-gray-600">
            <span>{icon}</span>
            {text}
          </div>
        ))}
      </div>

      {/* Enrollment Status */}
      {isEnrolled && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
          <p className="text-xs text-green-700 text-center">
            ✅ You are enrolled in this course
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursePurchaseCard;