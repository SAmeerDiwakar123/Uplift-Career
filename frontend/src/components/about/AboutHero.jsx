import React from 'react';
import { Sparkles } from 'lucide-react';
import { heroStats } from '@/data/aboutData';

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-10 sm:py-16 lg:py-20">
      {/* Subtle glow */}
      <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white border border-slate-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-5 sm:mb-6 shadow-sm">
          <Sparkles size={14} className="text-amber-500 sm:size-4" />
          <span className="text-xs sm:text-sm font-medium text-slate-700">About Uplift Career</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-slate-900">
          Building the Future of
          <br />
          <span className="text-blue-600">
            Career Development
          </span>
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed max-w-xl sm:max-w-2xl mx-auto mb-2 sm:mb-3">
          Uplift Career was founded with a single mission — to make quality career 
          development accessible to every student in India.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed max-w-xl sm:max-w-2xl mx-auto">
          We combine affordable courses, real internships, and direct job opportunities 
          to create a complete career ecosystem for the next generation of professionals.
        </p>

        {/* Stats Cards */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 lg:mt-10">
          {heroStats.map(([num, label, icon]) => (
            <div key={label} className="flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-100 flex items-center justify-center text-base sm:text-lg">
                {icon}
              </div>
              <div className="text-left">
                <div className="text-sm sm:text-base font-bold text-slate-900">{num}</div>
                <div className="text-[10px] sm:text-xs text-slate-500">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;