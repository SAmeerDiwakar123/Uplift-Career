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
    <section className="relative bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] sm:w-[600px] sm:h-[300px] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-3 pt-4 pb-6 sm:pt-16 sm:pb-16">
        <div className="text-center max-w-sm sm:max-w-2xl mx-auto">
          {/* Badge - Ultra Compact */}
          <div className="inline-flex items-center gap-1 bg-white/60 backdrop-blur-sm border border-white/30 px-2.5 py-0.5 rounded-full mb-2 sm:mb-5 shadow-sm">
            <Sparkles size={10} className="text-amber-500" />
            <span className="text-[8px] sm:text-xs font-medium text-slate-700">#1 Career Platform</span>
          </div>

          {/* Heading - Small */}
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-1.5 sm:mb-4">
            <span className="text-slate-800">Learn.</span>
            <span className="text-slate-800"> Experience.</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Get Hired.
            </span>
          </h1>

          {/* Subheading - Tiny */}
          <p className="text-[10px] sm:text-sm md:text-base text-slate-600 mb-3 sm:mb-6 max-w-xs sm:max-w-xl mx-auto leading-relaxed px-1">
            Courses, internships & jobs —
            <span className="text-slate-800 font-medium"> all in one place</span>
          </p>

          {/* CTA Buttons - Small */}
          <div className="flex gap-1.5 sm:gap-3 justify-center mb-3 sm:mb-6">
            <button
              onClick={() => navigate("/jobs")}
              className="flex-1 sm:flex-none bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 px-3 sm:px-6 md:px-8 py-1.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-sm hover:shadow-lg hover:shadow-amber-400/30 transition-all active:scale-95 flex items-center justify-center gap-1"
            >
              Jobs
              <ArrowRight size={10} className="sm:size-[14px]" />
            </button>
            <button
              onClick={() => navigate("/courses")}
              className="flex-1 sm:flex-none bg-white/60 backdrop-blur-sm text-slate-700 px-3 sm:px-6 md:px-8 py-1.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-sm border border-white/30 hover:bg-white/80 transition-all active:scale-95"
            >
              Courses
            </button>
          </div>

          {/* Search Bar - Compact */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-1 flex flex-col md:flex-row gap-1 max-w-sm sm:max-w-2xl mx-auto shadow-lg">
            <div className="flex items-center gap-1.5 px-2 py-1.5 sm:py-2.5">
              <Search size={12} className="text-slate-400 shrink-0 sm:size-[16px]" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full text-[10px] sm:text-sm text-slate-800 outline-none bg-transparent placeholder:text-slate-400"
              />
            </div>

            <div className="hidden md:block w-px bg-slate-200" />

            <div className="flex items-center gap-1.5 px-2 py-1.5 sm:py-2.5 border-t md:border-t-0 border-slate-100">
              <MapPin size={12} className="text-slate-400 shrink-0 sm:size-[16px]" />
              <input
                type="text"
                placeholder="Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full text-[10px] sm:text-sm text-slate-800 outline-none bg-transparent placeholder:text-slate-400"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-slate-800 text-white px-3 py-1.5 sm:py-3 md:px-6 rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-sm hover:bg-slate-700 transition-all active:scale-95"
            >
              <span className="md:hidden">Search</span>
              <span className="hidden md:inline">Search Jobs</span>
            </button>
          </div>

          {/* Tags - Mini */}
          <div className="mt-2 sm:mt-5 flex flex-wrap justify-center gap-1 sm:gap-2">
            <span className="text-[7px] sm:text-xs text-slate-500">Popular:</span>
            {["Remote", "MNC", "Fresher", "Data Science"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchTitle(tag);
                  navigate(`/jobs?q=${encodeURIComponent(tag)}`);
                }}
                className="bg-white/60 backdrop-blur-sm border border-white/30 px-1.5 sm:px-3 py-0.5 rounded-full text-[7px] sm:text-xs text-slate-600 hover:bg-white hover:text-slate-900 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats - Mini Grid */}
        <div className="mt-4 sm:mt-10 max-w-sm sm:max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-3">
          {[
            { number: "12K+", label: "Jobs", icon: Briefcase },
            { number: "3.5K+", label: "Companies", icon: Building },
            { number: "1.2M+", label: "Seekers", icon: Users },
            { number: "8.5K+", label: "Offers", icon: TrendingUp },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-2xl px-2 py-2 sm:px-4 sm:py-5 border border-white/30 text-center hover:bg-white/80 transition-all shadow-sm"
            >
              <stat.icon size={10} className="text-slate-500 mx-auto mb-0.5 sm:size-[16px] sm:mb-2" />
              <h2 className="text-xs sm:text-base md:text-lg font-bold text-slate-800">{stat.number}</h2>
              <p className="text-[7px] sm:text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;