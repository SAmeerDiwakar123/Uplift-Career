import React from 'react';
import { stats, statColors, statBgColors } from '@/data/aboutData';

const ImpactSection = () => {
  return (
    <section className="py-8 sm:py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-lg sm:text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <span>Our</span>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Impact</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">The numbers that speak for themselves</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map(([num, label, icon], index) => (
            <div key={label} className="group bg-white border border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:border-purple-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <div className={`w-10 h-10 ${statBgColors[index % statBgColors.length]} rounded-lg flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
              </div>
              <div className={`text-lg sm:text-xl font-bold text-gray-900 group-hover:${statColors[index % statColors.length]} transition-colors`}>{num}</div>
              <div className="text-[10px] text-gray-500 mt-0.5 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;