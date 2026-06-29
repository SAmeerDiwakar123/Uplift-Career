import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Sparkles, ArrowRight, Briefcase, Building, Users, TrendingUp } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className='bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 text-white py-8 sm:py-24 relative overflow-hidden'>
      {/* Simplified Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className='relative max-w-6xl mx-auto px-4 text-center'>
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full mb-3 sm:mb-6">
          <Sparkles size={12} className="text-blue-300" />
          <span className="text-[8px] sm:text-sm font-semibold text-blue-100">🚀 India's #1 Career Platform</span>
        </div>

        {/* Main Heading */}
        <h1 className='text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-1.5 sm:mb-4'>
          <span className="text-white">Learn.</span>
          <span className="text-white"> Experience.</span>
          <br />
          <span className='bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent'>Get Hired.</span>
        </h1>

        {/* Subheading */}
        <p className='text-[10px] sm:text-lg text-blue-100/90 mb-4 sm:mb-8 max-w-2xl mx-auto leading-relaxed'>
          Affordable courses, real internships, and direct job opportunities — 
          <span className="font-semibold text-white"> everything you need</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center mb-4 sm:mb-10">
          <button
            onClick={() => navigate('/jobs')}
            className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-400 text-indigo-900 px-5 sm:px-8 py-2 sm:py-3.5 rounded-xl font-bold text-xs sm:text-base hover:shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 flex items-center justify-center gap-1.5"
          >
            Browse Jobs
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => navigate('/courses')}
            className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white px-5 sm:px-8 py-2 sm:py-3.5 rounded-xl font-bold text-xs sm:text-base border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Explore Courses
          </button>
        </div>

        {/* Search Bar - Mobile Optimized */}
        <div className='bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 flex flex-col md:flex-row gap-1.5 sm:gap-2 max-w-3xl mx-auto shadow-2xl'>
          <div className="flex items-center gap-1.5 flex-1 px-2 sm:px-3">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder='Job title, Keywords...'
              className='w-full py-1.5 sm:py-3 text-gray-800 text-[10px] sm:text-sm outline-none bg-transparent'
            />
          </div>

          <div className="hidden md:block w-px bg-gray-200" />

          <div className="flex items-center gap-1.5 flex-1 px-2 sm:px-3">
            <MapPin size={14} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="City, state..."
              className="w-full py-1.5 sm:py-3 text-gray-800 text-[10px] sm:text-sm outline-none bg-transparent"
            />
          </div>

          <button
            onClick={() => navigate('/jobs')}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 px-4 sm:px-8 py-1.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-sm hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 whitespace-nowrap text-white"
          >
            Search Jobs
          </button>
        </div>

        {/* Popular Tags */}
        <div className='mt-3 sm:mt-6 flex flex-wrap justify-center gap-1 sm:gap-2 items-center'>
          <span className='text-[8px] sm:text-sm text-blue-300 font-medium'>Popular:</span>
          {["Remote", "MNC", "Fresher", "Data Science"].map((tag) => (
            <button 
              key={tag} 
              className="bg-white/10 backdrop-blur-sm border border-white/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[7px] sm:text-sm text-blue-100 hover:bg-white hover:text-indigo-900 transition-all duration-200"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Stats Section - Mobile Optimized */}
        <div className='mt-5 sm:mt-16 w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-4 text-center'>
          {[
            { number: '12K+', label: 'Live Jobs', icon: <Briefcase size={12} /> },
            { number: '3.5K+', label: 'Companies', icon: <Building size={12} /> },
            { number: '1.2M+', label: 'Job Seekers', icon: <Users size={12} /> },
            { number: '8.5K+', label: 'Daily Offers', icon: <TrendingUp size={12} /> },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl px-2 py-2 sm:px-4 sm:py-5 border border-white/10 hover:bg-white/15 transition-all duration-300"
            >
              <div className="text-blue-300 mb-0.5 sm:mb-1">{stat.icon}</div>
              <h2 className='text-sm sm:text-2xl font-bold text-yellow-400'>
                {stat.number}
              </h2>
              <p className='text-[7px] sm:text-sm text-blue-300 mt-0 sm:mt-0.5'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;