import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-8 sm:py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
          Ready to Launch Your Career?
        </h2>
        
        {/* Description */}
        <p className="text-sm text-gray-500 mb-6">
          Join 12,000+ students already learning, applying, and getting hired.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => navigate('/signup')} 
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition text-sm"
          >
            Sign Up Free
          </button>
          <button 
            onClick={() => navigate('/courses')} 
            className="bg-white text-gray-700 px-6 py-2.5 rounded-lg font-medium border border-gray-200 hover:border-indigo-300 hover:bg-gray-50 transition text-sm"
          >
            Browse Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;