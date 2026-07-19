import React from 'react';

const ValuesSection = () => {
  const values = [
    { 
      id: 1, 
      icon: '🎯', 
      title: 'Accessibility', 
      desc: 'Making quality education affordable and accessible to everyone.' 
    },
    { 
      id: 2, 
      icon: '💡', 
      title: 'Innovation', 
      desc: 'Constantly evolving to meet the needs of modern learners.' 
    },
    { 
      id: 3, 
      icon: '🤝', 
      title: 'Community', 
      desc: 'Building a supportive network of learners and mentors.' 
    },
    { 
      id: 4, 
      icon: '🚀', 
      title: 'Excellence', 
      desc: 'Striving for the highest quality in everything we do.' 
    },
  ];

  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
            Our Core Values
          </h2>
          <p className="text-sm text-gray-500">
            What drives us every day
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="text-3xl mb-3">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-500 leading-relaxed">
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