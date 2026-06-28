import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, Award, Sparkles } from 'lucide-react';

const BootcampBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-8 sm:py-16 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 p-8 md:p-10 shadow-2xl border border-purple-200">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-2xl" />
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold text-sm mb-4">
                <Sparkles size={16} />
                Uplift Bootcamp
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Learn, Get Placed, Pay Later
              </h2>
              <p className="text-purple-100 text-base mb-6 max-w-xl">
                3-month intensive programs with guaranteed placement support. 
                <span className="font-bold text-white"> No upfront cost.</span>
              </p>
              <button 
                onClick={() => navigate('/bootcamp')}
                className="group bg-white text-purple-700 px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Explore Bootcamps
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6 lg:gap-10">
              {[
                { icon: <TrendingUp size={24} />, number: '85%', label: 'Placement Rate' },
                { icon: <Award size={24} />, number: '₹6 LPA', label: 'Avg. Package' },
                { icon: <Users size={24} />, number: '200+', label: 'Hiring Partners' },
              ].map((stat) => (
                <div key={stat.label} className="text-center text-white">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl sm:text-2xl font-bold">{stat.number}</div>
                  <div className="text-purple-200 text-xs sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BootcampBanner;