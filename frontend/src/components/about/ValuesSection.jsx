import React from 'react';
import { values, gradientColors } from '@/data/aboutData';

const ValuesSection = () => {
  return (
    <section className="py-8 sm:py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-lg sm:text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <span>Our</span>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Core Values</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">What drives us every day</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item) => (
            <div key={item.id} className={`group bg-gradient-to-br ${gradientColors[item.id % gradientColors.length]} border rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer`}>
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-purple-600 transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;