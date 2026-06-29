import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Sparkles, ArrowRight, Briefcase, Building, Users, TrendingUp } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTitle.trim()) params.append("q", searchTitle.trim());
    if (searchLocation.trim()) params.append("location", searchLocation.trim());
    navigate(`/jobs?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32 flex flex-col items-center">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full mb-6">
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-xs font-medium text-slate-300">India's #1 Career Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            <span className="text-white">Learn.</span>{" "}
            <span className="text-white">Experience.</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Get Hired.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
            Affordable courses, real internships, and direct job opportunities —
            <span className="font-medium text-slate-200"> everything you need</span> to launch your career.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
            <button
              onClick={() => navigate("/jobs")}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 px-8 py-3 rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-amber-400/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Browse Jobs
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/courses")}
              className="w-full sm:w-auto bg-white/5 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-bold text-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              Explore Courses
            </button>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto shadow-2xl shadow-black/20">
            <div className="flex items-center gap-2.5 flex-1 px-4 py-2.5">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Job title, keywords..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full text-sm text-slate-800 outline-none bg-transparent placeholder:text-slate-400"
              />
            </div>

            <div className="hidden md:block w-px bg-slate-200 my-2" />

            <div className="flex items-center gap-2.5 flex-1 px-4 py-2.5">
              <MapPin size={18} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="City, state..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full text-sm text-slate-800 outline-none bg-transparent placeholder:text-slate-400"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-all duration-300 whitespace-nowrap"
            >
              Search
            </button>
          </div>

          {/* Popular Tags */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 items-center">
            <span className="text-xs text-slate-500 font-medium">Popular:</span>
            {["Remote", "MNC", "Engineering", "MBA", "Fresher", "Data Science"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchTitle(tag);
                  navigate(`/jobs?q=${encodeURIComponent(tag)}`);
                }}
                className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-slate-400 hover:bg-white hover:text-slate-900 transition-all duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { number: "12K+", label: "Live Jobs", icon: Briefcase },
            { number: "3.5K+", label: "Companies", icon: Building },
            { number: "1.2M+", label: "Job Seekers", icon: Users },
            { number: "8.5K+", label: "Daily Offers", icon: TrendingUp },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl px-4 py-5 border border-white/10 hover:bg-white/10 transition-all duration-300 text-center group"
            >
              <div className="flex justify-center mb-2">
                <stat.icon size={18} className="text-slate-500 group-hover:text-amber-400 transition-colors" />
              </div>
              <h2 className="text-xl font-bold text-white">{stat.number}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, MapPin, Sparkles, ArrowRight, Briefcase, Building, Users, TrendingUp } from "lucide-react";

// const Hero = () => {
//   const navigate = useNavigate();

//   return (
//     <section className='relative bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 overflow-hidden'>
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-400/10 rounded-full blur-3xl" />
        
//         {/* Floating Particles */}
//         <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
//         <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-200" />
//         <div className="absolute bottom-32 left-20 w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-700" />
//         <div className="absolute top-1/3 right-10 w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-500" />
//       </div>

//       <div className='relative max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-20 lg:py-28 flex flex-col items-center justify-center'>
//         <div className="text-center max-w-4xl mx-auto">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 px-2.5 sm:px-4 py-1 sm:py-2 rounded-full mb-2 sm:mb-6 shadow-lg">
//             <Sparkles size={12} className="text-blue-300" />
//             <span className="text-[8px] sm:text-sm font-semibold text-blue-100">🚀 India's #1 Career Platform</span>
//           </div>

//           {/* Main Heading */}
//           <h1 className='text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-1.5 sm:mb-4'>
//             <span className="text-white">Learn.</span>
//             <span className="text-white"> Experience.</span>
//             <br />
//             <span className='bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent'>Get Hired.</span>
//           </h1>

//           {/* Subheading */}
//           <p className='text-[10px] sm:text-lg text-blue-100/90 mb-3 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2'>
//             Affordable courses, real internships, and direct job opportunities — 
//             <span className="font-semibold text-white"> everything you need</span> to launch your career.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center mb-4 sm:mb-10">
//             <button
//               onClick={() => navigate('/jobs')}
//               className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-400 text-indigo-900 px-5 sm:px-8 py-2 sm:py-3.5 rounded-xl font-bold text-xs sm:text-base hover:shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-1.5"
//             >
//               Browse Jobs
//               <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//             </button>
//             <button
//               onClick={() => navigate('/courses')}
//               className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white px-5 sm:px-8 py-2 sm:py-3.5 rounded-xl font-bold text-xs sm:text-base border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
//             >
//               Explore Courses
//             </button>
//           </div>

//           {/* Search Bar - Mobile Optimized */}
//           <div className='bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 flex flex-col md:flex-row gap-1.5 sm:gap-2 max-w-3xl mx-auto shadow-2xl'>
//             <div className="flex items-center gap-1.5 flex-1 px-2 sm:px-3">
//               <Search size={14} className="text-gray-400 shrink-0" />
//               <input
//                 type="text"
//                 placeholder='Job title, Keywords...'
//                 className='w-full py-1.5 sm:py-3 text-gray-800 text-[10px] sm:text-sm outline-none bg-transparent'
//               />
//             </div>

//             <div className="hidden md:block w-px bg-gray-200" />

//             <div className="flex items-center gap-1.5 flex-1 px-2 sm:px-3">
//               <MapPin size={14} className="text-gray-400 shrink-0" />
//               <input
//                 type="text"
//                 placeholder="City, state..."
//                 className="w-full py-1.5 sm:py-3 text-gray-800 text-[10px] sm:text-sm outline-none bg-transparent"
//               />
//             </div>

//             <button
//               onClick={() => navigate('/jobs')}
//               className="bg-gradient-to-r from-indigo-600 to-blue-600 px-3.5 sm:px-8 py-1.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-sm hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 whitespace-nowrap text-white"
//             >
//               Search Jobs
//             </button>
//           </div>

//           {/* Popular Tags */}
//           <div className='mt-2 sm:mt-6 flex flex-wrap justify-center gap-1 sm:gap-2 items-center px-2'>
//             <span className='text-[8px] sm:text-sm text-blue-300 font-medium'>Popular:</span>
//             {["Remote", "MNC", "Engineering", "MBA", "Fresher", "Data Science"].map((tag) => (
//               <button 
//                 key={tag} 
//                 className="bg-white/10 backdrop-blur-sm border border-white/10 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[7px] sm:text-sm text-blue-100 hover:bg-white hover:text-indigo-900 transition-all duration-200"
//               >
//                 {tag}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Stats Section - Mobile Optimized */}
//         <div className='mt-4 sm:mt-16 w-full max-w-4xl mx-auto px-2 grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-4 text-center'>
//           {[
//             { number: '12K+', label: 'Live Jobs', icon: <Briefcase size={12} /> },
//             { number: '3.5K+', label: 'Companies', icon: <Building size={12} /> },
//             { number: '1.2M+', label: 'Job Seekers', icon: <Users size={12} /> },
//             { number: '8.5K+', label: 'Daily Offers', icon: <TrendingUp size={12} /> },
//           ].map((stat, index) => (
//             <div 
//               key={index} 
//               className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl px-1.5 sm:px-4 py-2 sm:py-5 border border-white/10 hover:bg-white/15 transition-all duration-300"
//             >
//               <div className="text-blue-300 mb-0.5 sm:mb-1">{stat.icon}</div>
//               <h2 className='text-xs sm:text-2xl font-bold text-yellow-400'>
//                 {stat.number}
//               </h2>
//               <p className='text-[6px] sm:text-sm text-blue-300 mt-0 sm:mt-0.5'>{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;