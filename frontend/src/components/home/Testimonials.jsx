import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    { 
      text: "I got my first job at a startup within 2 months of completing the React course. The practical projects really helped!", 
      name: 'Rahul Singh', 
      role: 'Frontend Developer, Jaipur', 
      initials: 'RS', 
      bg: 'from-purple-100 to-purple-50',
      color: 'text-purple-600'
    },
    { 
      text: "As a student from a tier-3 city, I never thought I could get a ₹7 LPA job. This platform changed my life completely.", 
      name: 'Priya Kumari', 
      role: 'Data Analyst, Patna', 
      initials: 'PK', 
      bg: 'from-teal-100 to-teal-50',
      color: 'text-teal-600'
    },
    { 
      text: "The internship I got through this platform turned into a full-time offer. Best decision I ever made!", 
      name: 'Aman Mishra', 
      role: 'Backend Developer, Lucknow', 
      initials: 'AM', 
      bg: 'from-amber-100 to-amber-50',
      color: 'text-amber-600'
    },
  ];

  return (
    <div className="py-16 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Student <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Success Stories</span>
          </h2>
          <p className="text-gray-500 text-lg">Real stories from real students</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div key={t.name} className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-2xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-2">
              <Quote size={28} className="text-purple-300 mb-3" />
              <p className="text-gray-700 leading-relaxed mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.bg} flex items-center justify-center font-bold ${t.color} text-lg`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;