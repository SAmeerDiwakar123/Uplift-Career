import React from 'react';
import { teamMembers } from '@/data/aboutData';

const TeamSection = () => {
  return (
    <section className="py-8 sm:py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-lg sm:text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <span>Our</span>
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">The amazing people behind Uplift Career</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="group bg-white border border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:border-purple-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <div className="w-14 h-14 rounded-full mx-auto mb-2 border-2 border-purple-200 flex items-center justify-center text-lg font-bold transition-all duration-300 group-hover:border-purple-400 group-hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${member.color}22, ${member.color}11)`, color: member.color }}>
                {member.initials}
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-0.5 group-hover:text-purple-600 transition-colors">{member.name}</h4>
              <p className="text-[10px] text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;