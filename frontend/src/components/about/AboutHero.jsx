import React from 'react';

const AboutHero = () => {
  const heroStats = [
    ["12K+", "Students", "🎓"],
    ["50+", "Courses", "📚"],
    ["100+", "Companies", "🏢"],
    ["95%", "Success Rate", "📈"],
  ];

  return (
    <section className="py-8 sm:py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
          About Uplift Career
        </h1>
        
        {/* Description */}
        <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-1">
          Uplift Career was founded with a single mission — to make quality career 
          development accessible to every student in India.
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          We combine affordable courses, real internships, and direct job opportunities 
          to create a complete career ecosystem for the next generation of professionals.
        </p>

        {/* Stats Cards */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {heroStats.map(([num, label, icon]) => (
            <div 
              key={label} 
              className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-200 hover:shadow-md transition"
            >
              <span className="text-lg">{icon}</span>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900">{num}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;