import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-8 sm:py-16 px-6 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 px-4 py-2 rounded-full mb-6 shadow-sm">
          <Rocket size={16} className="text-purple-600" />
          <span className="text-sm font-semibold text-purple-700">Start Your Journey Today</span>
        </div>
        
        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
          Ready to Launch Your Career?
        </h2>
        
        {/* Description */}
        <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join 12,000+ students already learning, applying, and getting hired.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/signup')} 
            className="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-xl hover:shadow-purple-200 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-base"
          >
            Sign Up Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => navigate('/courses')} 
            className="bg-white text-gray-700 px-8 py-3.5 rounded-xl font-bold border-2 border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-base"
          >
            Browse Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;