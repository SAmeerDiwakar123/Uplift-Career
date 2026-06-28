import React from 'react';
import { Sparkles } from 'lucide-react';
import { heroStats } from '@/data/aboutData';

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-gray-100 py-12 sm:py-20">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-200 px-4 py-2 rounded-full mb-6 shadow-sm">
          <Sparkles size={16} className="text-purple-600" />
          <span className="text-sm font-semibold text-purple-700">About Uplift Career</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-800 bg-clip-text text-transparent">
          Building the Future of
          <br />
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Career Development
          </span>
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mb-3">
          Uplift Career was founded with a single mission - to make quality career 
          development accessible to every student in India.
        </p>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
          We combine affordable courses, real internships, and direct job opportunities 
          to create a complete career ecosystem for the next generation of professionals.
        </p>

        {/* Stats Cards */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8">
          {heroStats.map(([num, label, icon]) => (
            <div key={label} className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center text-lg">
                {icon}
              </div>
              <div className="text-left">
                <div className="text-base font-bold text-gray-900">{num}</div>
                <div className="text-[10px] text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;