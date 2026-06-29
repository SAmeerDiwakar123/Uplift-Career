import React from 'react';
import { stats } from '@/data/aboutData';

const ImpactSection = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Our <span className="text-blue-600">Impact</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            The numbers that speak for themselves
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {stats.map(([num, label, icon]) => (
            <div 
              key={label} 
              className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 text-center hover:shadow-md hover:border-slate-200 transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">
                {icon}
              </div>

              {/* Number */}
              <div className="text-base sm:text-lg font-bold text-slate-900">
                {num}
              </div>

              {/* Label */}
              <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 font-medium">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection