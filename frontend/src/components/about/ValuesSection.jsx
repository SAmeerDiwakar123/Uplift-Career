import React from 'react';
import { values } from '@/data/aboutData';

const ValuesSection = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Our <span className="text-blue-600">Core Values</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            What drives us every day
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {values.map((item) => (
            <div 
              key={item.id} 
              className="bg-slate-50 rounded-2xl border border-slate-100 p-5 sm:p-6 text-center hover:shadow-md hover:border-slate-200 transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;