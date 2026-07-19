import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    { id: 1, name: 'Rahul Sharma', role: 'CEO & Co-Founder', initials: 'RS' },
    { id: 2, name: 'Priya Patel', role: 'CTO & Co-Founder', initials: 'PP' },
    { id: 3, name: 'Amit Kumar', role: 'Head of Education', initials: 'AK' },
    { id: 4, name: 'Sneha Reddy', role: 'Head of Placements', initials: 'SR' },
    { id: 5, name: 'Vikram Singh', role: 'Senior Instructor', initials: 'VS' },
    { id: 6, name: 'Neha Gupta', role: 'Product Manager', initials: 'NG' },
    { id: 7, name: 'Arjun Nair', role: 'Tech Lead', initials: 'AN' },
    { id: 8, name: 'Kavya Menon', role: 'Marketing Lead', initials: 'KM' },
  ];

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
            Our Team
          </h2>
          <p className="text-sm text-gray-500">
            The amazing people behind Uplift Career
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition"
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full mx-auto mb-2 bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-600">
                {member.initials}
              </div>

              {/* Info */}
              <h4 className="text-xs font-semibold text-gray-900 mb-0.5">
                {member.name}
              </h4>
              <p className="text-[10px] text-gray-500">
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