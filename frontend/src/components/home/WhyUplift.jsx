import React from 'react';
import { Sparkles, Briefcase, Users, MapPin } from 'lucide-react';

const WhyUplift = () => {
  const whyCards = [
    { icon: <Sparkles size={22} />, title: 'Affordable Pricing', desc: 'Courses starting at ₹999 — a fraction of what other platforms charge.' },
    { icon: <Briefcase size={22} />, title: 'Real Internships', desc: 'Get actual work experience with verified companies before your first job.' },
    { icon: <Users size={22} />, title: 'Expert Instructors', desc: 'Learn from working professionals — not just academics.' },
    { icon: <MapPin size={22} />, title: 'Tier 2/3 Focus', desc: 'Built for students everywhere in India, not just metro cities.' },
  ];

  return (
    <section className="py-8 sm:py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
            Why Uplift Career?
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            We're different from other platforms
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyCards.map((card) => (
            <div 
              key={card.title} 
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="text-indigo-600 mb-3">
                {card.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
                {card.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUplift;