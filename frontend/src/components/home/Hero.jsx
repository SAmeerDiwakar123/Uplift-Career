import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Sparkles, ArrowRight, Briefcase, GraduationCap, Building, Users, TrendingUp } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className='relative min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 overflow-hidden'>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-400/10 rounded-full blur-3xl" />
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-200" />
        <div className="absolute bottom-32 left-20 w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-700" />
        <div className="absolute top-1/3 right-10 w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-500" />
      </div>

      <div className='relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-28 flex flex-col items-center justify-center min-h-screen'>
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 shadow-lg">
            <Sparkles size={14} className="text-blue-300" />
            <span className="text-[10px] sm:text-sm font-semibold text-blue-100">🚀 India's #1 Career Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-3 sm:mb-4'>
            <span className="text-white">Learn.</span>
            <span className="text-white"> Experience.</span>
            <br />
            <span className='bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent'>Get Hired.</span>
          </h1>

          {/* Subheading */}
          <p className='text-sm sm:text-lg text-blue-100/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2'>
            Affordable courses, real internships, and direct job opportunities — 
            <span className="font-semibold text-white"> everything you need</span> to launch your career.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10">
            <button
              onClick={() => navigate('/jobs')}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-400 text-indigo-900 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base hover:shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Browse Jobs
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Courses
            </button>
          </div>

          {/* Search Bar - Mobile Optimized */}
          <div className='bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-2xl'>
            <div className="flex items-center gap-2 flex-1 px-2 sm:px-3">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder='Job title, Keywords...'
                className='w-full py-2 sm:py-3 text-gray-800 text-xs sm:text-sm outline-none bg-transparent'
              />
            </div>

            <div className="hidden md:block w-px bg-gray-200" />

            <div className="flex items-center gap-2 flex-1 px-2 sm:px-3">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="City, state..."
                className="w-full py-2 sm:py-3 text-gray-800 text-xs sm:text-sm outline-none bg-transparent"
              />
            </div>

            <button
              onClick={() => navigate('/jobs')}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 whitespace-nowrap text-white"
            >
              Search Jobs
            </button>
          </div>

          {/* Popular Tags */}
          <div className='mt-4 sm:mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-2 items-center px-2'>
            <span className='text-[10px] sm:text-sm text-blue-300 font-medium'>Popular:</span>
            {["Remote", "MNC", "Engineering", "MBA", "Fresher", "Data Science"].map((tag) => (
              <button 
                key={tag} 
                className="bg-white/10 backdrop-blur-sm border border-white/10 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-sm text-blue-100 hover:bg-white hover:text-indigo-900 transition-all duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Section - Mobile Optimized */}
        <div className='mt-8 sm:mt-16 w-full max-w-4xl mx-auto px-2 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center'>
          {[
            { number: '12,458+', label: 'Live Jobs', icon: <Briefcase size={16} /> },
            { number: '3,576+', label: 'Companies', icon: <Building size={16} /> },
            { number: '1.2M+', label: 'Job Seekers', icon: <Users size={16} /> },
            { number: '8,500+', label: 'Daily Offers', icon: <TrendingUp size={16} /> },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl px-2 py-3 sm:px-4 sm:py-5 border border-white/10 hover:bg-white/15 transition-all duration-300"
            >
              <div className="text-blue-300 mb-1">{stat.icon}</div>
              <h2 className='text-sm sm:text-2xl font-bold text-yellow-400'>
                {stat.number}
              </h2>
              <p className='text-[8px] sm:text-sm text-blue-300 mt-0.5'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;