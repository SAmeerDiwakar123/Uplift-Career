import React from 'react';
import { Sparkles, Briefcase, Users, MapPin, TrendingUp, Award } from 'lucide-react';

const WhyUplift = () => {
  const whyCards = [
    { icon: <Sparkles size={24} />, title: 'Affordable Pricing', desc: 'Courses starting at ₹999 — a fraction of what other platforms charge.', bg: 'from-purple-100 to-purple-50', color: 'text-purple-600' },
    { icon: <Briefcase size={24} />, title: 'Real Internships', desc: 'Get actual work experience with verified companies before your first job.', bg: 'from-teal-100 to-teal-50', color: 'text-teal-600' },
    { icon: <Users size={24} />, title: 'Expert Instructors', desc: 'Learn from working professionals — not just academics.', bg: 'from-amber-100 to-amber-50', color: 'text-amber-600' },
    { icon: <MapPin size={24} />, title: 'Tier 2/3 Focus', desc: 'Built for students everywhere in India, not just metro cities.', bg: 'from-rose-100 to-rose-50', color: 'text-rose-600' },
  ];

  return (
    <section className="py-8 sm:py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <span>Why</span>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Uplift Career</span>
            <span>?</span>
            <Sparkles size={20} className="text-purple-500" />
          </h2>
          <p className="text-sm text-gray-500 mt-1">We're different from other platforms</p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyCards.map((card) => (
            <div 
              key={card.title} 
              className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-2xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.bg} flex items-center justify-center ${card.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUplift;