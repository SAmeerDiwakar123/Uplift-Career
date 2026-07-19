import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    { 
      text: "I got my first job at a startup within 2 months of completing the React course. The practical projects really helped!", 
      name: 'Rahul Singh', 
      role: 'Frontend Developer, Jaipur', 
      initials: 'RS'
    },
    { 
      text: "As a student from a tier-3 city, I never thought I could get a ₹7 LPA job. This platform changed my life completely.", 
      name: 'Priya Kumari', 
      role: 'Data Analyst, Patna', 
      initials: 'PK'
    },
    { 
      text: "The internship I got through this platform turned into a full-time offer. Best decision I ever made!", 
      name: 'Aman Mishra', 
      role: 'Backend Developer, Lucknow', 
      initials: 'AM'
    },
  ];

  return (
    <section className="py-8 sm:py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
            Student Success Stories
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Real stories from real students
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, index) => (
            <div 
              key={t.name} 
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition"
            >
              <Quote size={20} className="text-indigo-400 mb-3" />
              <p className="text-sm text-gray-600 leading-relaxed mb-4 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-indigo-600 text-sm">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;