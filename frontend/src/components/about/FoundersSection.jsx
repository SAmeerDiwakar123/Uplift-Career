import React from 'react';
import { founders } from '@/data/aboutData';

const FoundersSection = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Meet Our <span className="text-blue-600">Founders</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            The visionaries behind Uplift Career
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {founders.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 text-center hover:shadow-lg hover:border-slate-200 transition-all duration-300"
            >
              {/* Avatar */}
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 border-2 border-slate-100 flex items-center justify-center text-lg sm:text-2xl font-bold text-slate-700 bg-slate-50"
              >
                {member.initials}
              </div>

              {/* Info */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-0.5">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm text-blue-600 font-medium">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;