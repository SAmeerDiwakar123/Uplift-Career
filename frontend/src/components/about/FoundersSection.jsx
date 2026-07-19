import React from 'react';

const FoundersSection = () => {
  const founders = [
    { 
      id: 1, 
      name: 'Rahul Sharma', 
      role: 'CEO & Co-Founder', 
      initials: 'RS' 
    },
    { 
      id: 2, 
      name: 'Priya Patel', 
      role: 'CTO & Co-Founder', 
      initials: 'PP' 
    },
  ];

  return (
    <section className="py-8 sm:py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
            Meet Our Founders
          </h2>
          <p className="text-sm text-gray-500">
            The visionaries behind Uplift Career
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {founders.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition"
            >
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full mx-auto mb-3 bg-indigo-100 flex items-center justify-center text-sm font-semibold text-indigo-600">
                {member.initials}
              </div>

              {/* Info */}
              <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                {member.name}
              </h3>
              <p className="text-xs text-gray-500">
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