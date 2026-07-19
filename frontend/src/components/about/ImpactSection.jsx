import React from 'react';

const ImpactSection = () => {
  const stats = [
    ["12K+", "Students", "🎓"],
    ["50+", "Courses", "📚"],
    ["100+", "Companies", "🏢"],
    ["95%", "Success Rate", "📈"],
    ["30+", "Instructors", "👨‍🏫"],
    ["4.8", "Avg Rating", "⭐"],
  ];

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
            Our Impact
          </h2>
          <p className="text-sm text-gray-500">
            The numbers that speak for themselves
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map(([num, label, icon]) => (
            <div 
              key={label} 
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="text-2xl mb-2">
                {icon}
              </div>

              {/* Number */}
              <div className="text-sm font-semibold text-gray-900">
                {num}
              </div>

              {/* Label */}
              <div className="text-xs text-gray-500 mt-0.5">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;