import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

const Hero = () => {

  const navigate = useNavigate();

  return (
    <section className='bg-indigo-900 text-white py-10 sm:py-24'>
      <div className='max-w-6xl mx-auto px-4 text-center'>

        <span className="text-[10px] sm:text-xs bg-white/10 text-indigo-200 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-medium">
          🚀 10,000+ Jobs Available
        </span>

        <h1 className='text-2xl sm:text-4xl md:text-6xl font-bold mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight'>
          Find your Dream Job <br />
          <span className='text-yellow-400'>Today</span>
        </h1>

        <p className='text-xs sm:text-lg text-indigo-200 mb-6 sm:mb-10 max-w-xl mx-auto'>
          Discover 10,000+ job opportunities with top companies. Your next career move starts here.
        </p>

        {/* Search Bar */}
        <div className='bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex flex-col md:flex-row gap-1.5 sm:gap-2 max-w-3xl mx-auto shadow-xl'>
          <div className="flex items-center gap-2 flex-1 px-2 sm:px-3">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder='Job title, Keywords, or company'
              className='w-full py-2 sm:py-3 text-gray-800 text-xs sm:text-sm outline-none bg-transparent'
            />
          </div>

          <div className="hidden md:block w-px bg-gray-200 my-2" />

          <div className="flex items-center gap-2 flex-1 px-2 sm:px-3">
            <MapPin size={14} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="City, state, or pin code"
              className="w-full py-2 sm:py-3 text-gray-800 text-xs sm:text-sm outline-none bg-transparent"
            />
          </div>

          <button
            onClick={() => navigate('/jobs')}
            className="bg-indigo-600 px-5 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm hover:bg-indigo-700 transition whitespace-nowrap">
            Search Jobs
          </button>
        </div>

        {/* Popular Tags */}
        <div className='mt-4 sm:mt-5 flex flex-wrap justify-center gap-1.5 sm:gap-2 items-center'>
          <span className='text-xs sm:text-sm text-indigo-300'>Popular:</span>
          {["Remote", "MNC", "Engineering", "MBA", "Fresher", "Data Science"].map((tag) => (
            <button key={tag} className="bg-white/10 border border-white/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-sm hover:bg-white hover:text-indigo-800 transition">
              {tag}
            </button>
          ))}
        </div>

      </div>

      {/* Stats */}
      <div className='mt-8 sm:mt-16 max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center'>
        {[
          { number: '12,458+', label: 'Live Jobs' },
          { number: '3,576+', label: 'Companies' },
          { number: '1.2M+', label: 'Job Seekers' },
          { number: '8,500+', label: 'Daily Offers' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/10 rounded-xl sm:rounded-2xl px-3 py-3 sm:px-4 sm:py-5 border border-white/10">
            <h2 className='text-base sm:text-2xl font-bold'>{stat.number}</h2>
            <p className='text-indigo-300 text-[10px] sm:text-sm mt-0.5 sm:mt-1'>{stat.label}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Hero;