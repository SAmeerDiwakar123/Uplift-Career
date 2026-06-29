import React from 'react';
import { teamMembers } from '@/data/aboutData';

const TeamSection = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Our <span className="text-blue-600">Team</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            The amazing people behind Uplift Career
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-white border border-slate-100 rounded-xl p-3 sm:p-4 text-center hover:shadow-md hover:border-slate-200 transition-all duration-300"
            >
              {/* Avatar */}
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full mx-auto mb-2 border border-slate-100 flex items-center justify-center text-sm sm:text-base font-bold text-slate-600 bg-slate-50"
              >
                {member.initials}
              </div>

              {/* Info */}
              <h4 className="text-xs sm:text-sm font-semibold text-slate-900 mb-0.5">
                {member.name}
              </h4>
              <p className="text-[10px] sm:text-xs text-slate-500">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;