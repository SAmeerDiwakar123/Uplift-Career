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
    <section className="relative bg-slate-950 overflow-hidden">
      {/* Subtle glow - desktop pe zyada, mobile pe kam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] sm:w-[600px] sm:h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-12 sm:pt-16 sm:pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24">
        <div className="text-center max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/5 border border-white/10 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-5 md:mb-6">
            <Sparkles size={12} className="text-amber-400 sm:size-[14px]" />
            <span className="text-[11px] sm:text-xs md:text-sm font-medium text-slate-400">India's #1 Career Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-3 sm:mb-4 md:mb-5">
            <span className="text-white">Learn.</span>{" "}
            <span className="text-white">Experience.</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Get Hired.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xs sm:text-sm md:text-base text-slate-500 mb-5 sm:mb-6 md:mb-8 max-w-sm sm:max-w-md md:max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
            Affordable courses, real internships, and direct job opportunities —
            <span className="text-slate-300"> everything you need</span> to launch your career.
          </p>

          {/* CTA */}
          <div className="flex gap-2 sm:gap-3 justify-center mb-5 sm:mb-6 md:mb-10 px-4 sm:px-0">
            <button
              onClick={() => navigate("/jobs")}
              className="flex-1 sm:flex-none bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm hover:shadow-lg hover:shadow-amber-400/20 transition-all active:scale-95 flex items-center justify-center gap-1.5 sm:gap-2"
            >
              Browse Jobs
              <ArrowRight size={14} className="sm:size-[16px]" />
            </button>
            <button
              onClick={() => navigate("/courses")}
              className="flex-1 sm:flex-none bg-white/5 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm border border-white/10 hover:bg-white/10 transition-all active:scale-95"
            >
              Explore Courses
            </button>
          </div>

          {/* Search Bar - mobile: stacked, md+: side by side */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 flex flex-col md:flex-row gap-1.5 sm:gap-2 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto shadow-xl sm:shadow-2xl">
            <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3">
              <Search size={16} className="text-slate-400 shrink-0 sm:size-[18px]" />
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

            <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border-t md:border-t-0 border-slate-100">
              <MapPin size={16} className="text-slate-400 shrink-0 sm:size-[18px]" />
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
              className="bg-slate-900 text-white py-2.5 sm:py-3 md:px-6 rounded-lg sm:rounded-xl font-semibold text-sm hover:bg-slate-800 transition-all active:scale-95 md:whitespace-nowrap"
            >
              <span className="md:hidden">Search Jobs</span>
              <span className="hidden md:inline">Search</span>
            </button>
          </div>

          {/* Tags */}
          <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-2 px-2 sm:px-0">
            <span className="text-[10px] sm:text-xs text-slate-600">Popular:</span>
            {["Remote", "MNC", "Engineering", "MBA", "Fresher", "Data Science"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchTitle(tag);
                  navigate(`/jobs?q=${encodeURIComponent(tag)}`);
                }}
                className="bg-white/5 border border-white/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs text-slate-500 hover:bg-white hover:text-slate-900 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats - mobile: 2-col compact, sm+: 4-col proper */}
        <div className="mt-8 sm:mt-10 md:mt-14 lg:mt-16 max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {[
            { number: "12K+", label: "Live Jobs", icon: Briefcase },
            { number: "3.5K+", label: "Companies", icon: Building },
            { number: "1.2M+", label: "Job Seekers", icon: Users },
            { number: "8.5K+", label: "Daily Offers", icon: TrendingUp },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 md:py-5 border border-white/10 text-center hover:bg-white/10 transition-all"
            >
              <div className="flex justify-center mb-1 sm:mb-2">
                <stat.icon size={14} className="text-slate-600 sm:size-[16px] md:size-[18px]" />
              </div>
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">{stat.number}</h2>
              <p className="text-[10px] sm:text-xs text-slate-600 mt-0.5">{stat.label}</p>
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