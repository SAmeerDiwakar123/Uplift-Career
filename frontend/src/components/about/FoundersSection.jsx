import React from 'react';
import { founders } from '@/data/aboutData';

const FoundersSection = () => {
  return (
    <section className="py-8 sm:py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-lg sm:text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <span>👑 Meet Our</span>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Founders</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">The visionaries behind Uplift Career</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {founders.map((member) => (
            <div key={member.id} className="group bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-2xl hover:border-purple-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{member.icon}</div>
              <div className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-purple-200 flex items-center justify-center text-2xl font-bold transition-all duration-300 group-hover:border-purple-400 group-hover:scale-110"
                style={{ background: `linear-gradient(135deg, ${member.color}22, ${member.color}11)`, color: member.color }}>
                {member.initials}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-0.5 group-hover:text-purple-600 transition-colors">{member.name}</h3>
              <p className="text-sm text-purple-600 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;