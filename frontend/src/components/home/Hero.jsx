import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Sparkles, ArrowRight, Briefcase, Users, Building2, Award } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  // Data for stats - easy to update
  const statsData = [
    { number: '12,458+', label: 'Live Jobs', icon: <Briefcase size={20} /> },
    { number: '3,576+', label: 'Companies', icon: <Building2 size={20} /> },
    { number: '1.2M+', label: 'Job Seekers', icon: <Users size={20} /> },
    { number: '8,500+', label: 'Daily Offers', icon: <Award size={20} /> },
  ];

  // Popular tags for freshers
  const popularTags = ["Remote", "MNC", "Engineering", "Fresher", "Data Science", "MBA"];

  // Handle search - redirect to jobs page
  const handleSearch = () => {
    navigate('/jobs');
  };

  return (
    <section className='relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden'>
      
      {/* Background decorations - just for visual appeal */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-white/5 to-transparent" />
      
      {/* Floating circles for design */}
      <div className="absolute top-20 right-20 w-64 h-64 border border-white/10 rounded-full animate-pulse" />
      <div className="absolute bottom-20 left-20 w-48 h-48 border border-white/10 rounded-full animate-pulse delay-75" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full" />

      <div className='relative max-w-6xl mx-auto px-4 text-center py-16 sm:py-24'>

        {/* Badge - shows job count */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full mb-6">
          <Sparkles size={16} className="text-yellow-300" />
          <span className="text-sm font-medium text-white/90">
            🎯 10,000+ Jobs Available
          </span>
        </div>

        {/* Main heading */}
        <h1 className='text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-4'>
          Find Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300">
            Dream Job Today
          </span>
        </h1>

        {/* Subtitle - encouraging freshers */}
        <p className='text-base sm:text-lg text-indigo-100 max-w-2xl mx-auto mb-8'>
          Discover thousands of opportunities with top companies. 
          Your next career move starts here.
        </p>

        {/* Search Box - where users can search jobs */}
        <div className='bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-2xl shadow-indigo-900/30'>
          
          {/* Job title input */}
          <div className="flex items-center gap-2 flex-1 px-4">
            <Search size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder='Job title, Keywords, or company'
              className='w-full py-3 text-gray-800 text-sm outline-none bg-transparent'
            />
          </div>

          {/* Divider line */}
          <div className="hidden md:block w-px bg-gray-200" />

          {/* Location input */}
          <div className="flex items-center gap-2 flex-1 px-4">
            <MapPin size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="City, state, or pin code"
              className="w-full py-3 text-gray-800 text-sm outline-none bg-transparent"
            />
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-3 rounded-xl font-semibold text-sm hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            Search
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Popular tags - helps freshers find trending jobs */}
        <div className='mt-5 flex flex-wrap justify-center gap-2 items-center'>
          <span className='text-sm text-indigo-200'>Trending:</span>
          {popularTags.map((tag) => (
            <button 
              key={tag} 
              className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1 rounded-full text-sm hover:bg-white hover:text-indigo-700 hover:border-white transition-all duration-200"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Stats section - shows platform growth */}
        <div className='mt-10 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4'>
          {statsData.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-4 border border-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-indigo-200">{stat.icon}</span>
                <h2 className='text-xl font-bold'>{stat.number}</h2>
              </div>
              <p className='text-indigo-200 text-xs mt-1'>{stat.label}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Wave at bottom - connects to next section */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 40 1380 40L1440 40V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#f3f4f6"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;







// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, MapPin } from "lucide-react";

// const Hero = () => {

//   const navigate = useNavigate();

//   return (
//     <section className='bg-indigo-900 text-white py-10 sm:py-24'>
//       <div className='max-w-6xl mx-auto px-4 text-center'>

//         <span className="text-[10px] sm:text-xs bg-white/10 text-indigo-200 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-medium">
//           🚀 10,000+ Jobs Available
//         </span>

//         <h1 className='text-2xl sm:text-4xl md:text-6xl font-bold mt-4 sm:mt-6 mb-2 sm:mb-4 leading-tight'>
//           Find your Dream Job <br />
//           <span className='text-yellow-400'>Today</span>
//         </h1>

//         <p className='text-xs sm:text-lg text-indigo-200 mb-6 sm:mb-10 max-w-xl mx-auto'>
//           Discover 10,000+ job opportunities with top companies. Your next career move starts here.
//         </p>

//         {/* Search Bar */}
//         <div className='bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex flex-col md:flex-row gap-1.5 sm:gap-2 max-w-3xl mx-auto shadow-xl'>
//           <div className="flex items-center gap-2 flex-1 px-2 sm:px-3">
//             <Search size={14} className="text-gray-400 shrink-0" />
//             <input
//               type="text"
//               placeholder='Job title, Keywords, or company'
//               className='w-full py-2 sm:py-3 text-gray-800 text-xs sm:text-sm outline-none bg-transparent'
//             />
//           </div>

//           <div className="hidden md:block w-px bg-gray-200 my-2" />

//           <div className="flex items-center gap-2 flex-1 px-2 sm:px-3">
//             <MapPin size={14} className="text-gray-400 shrink-0" />
//             <input
//               type="text"
//               placeholder="City, state, or pin code"
//               className="w-full py-2 sm:py-3 text-gray-800 text-xs sm:text-sm outline-none bg-transparent"
//             />
//           </div>

//           <button
//             onClick={() => navigate('/jobs')}
//             className="bg-indigo-600 px-5 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm hover:bg-indigo-700 transition whitespace-nowrap">
//             Search Jobs
//           </button>
//         </div>

//         {/* Popular Tags */}
//         <div className='mt-4 sm:mt-5 flex flex-wrap justify-center gap-1.5 sm:gap-2 items-center'>
//           <span className='text-xs sm:text-sm text-indigo-300'>Popular:</span>
//           {["Remote", "MNC", "Engineering", "MBA", "Fresher", "Data Science"].map((tag) => (
//             <button key={tag} className="bg-white/10 border border-white/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-sm hover:bg-white hover:text-indigo-800 transition">
//               {tag}
//             </button>
//           ))}
//         </div>

//       </div>

//       {/* Stats */}
//       <div className='mt-8 sm:mt-16 max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center'>
//         {[
//           { number: '12,458+', label: 'Live Jobs' },
//           { number: '3,576+', label: 'Companies' },
//           { number: '1.2M+', label: 'Job Seekers' },
//           { number: '8,500+', label: 'Daily Offers' },
//         ].map((stat, i) => (
//           <div key={i} className="bg-white/10 rounded-xl sm:rounded-2xl px-3 py-3 sm:px-4 sm:py-5 border border-white/10">
//             <h2 className='text-base sm:text-2xl font-bold'>{stat.number}</h2>
//             <p className='text-indigo-300 text-[10px] sm:text-sm mt-0.5 sm:mt-1'>{stat.label}</p>
//           </div>
//         ))}
//       </div>

//     </section>
//   );
// };

// export default Hero;