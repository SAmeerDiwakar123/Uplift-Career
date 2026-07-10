import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Search, ArrowRight, TrendingUp } from 'lucide-react';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import { setAllJobs, setSearchJobByText } from '@/redux/jobSlice'

const RecruiterDashboard = () => {


  const { searchJobByText, alljobs } = useSelector(store => store.job);
  const [filteredJobs, setFilteredJobs] = useState(alljobs);

  // मॉक डेटा
  const stats = {
    totalJobs: 24,
    totalUsers: 1240,
    applications: 385,
    hired: 18
  };

  const recentApplications = [
    { id: 1, name: "Rahul Sharma", role: "Frontend Developer", company: "TechCorp", date: "Applied 2 days ago", status: "Pending", statusStyle: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/10" },
    { id: 2, name: "Priya Verma", role: "UI/UX Designer", company: "DesignHub", date: "Applied 3 days ago", status: "Accepted", statusStyle: "bg-green-50 text-green-700 ring-1 ring-green-600/10" },
    { id: 3, name: "Amit Singh", role: "Backend Developer", company: "Infosys", date: "Applied 1 week ago", status: "Rejected", statusStyle: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/10" },
    { id: 4, name: "Sneha Gupta", role: "Data Analyst", company: "Analytics Co", date: "Applied 1 week ago", status: "Pending", statusStyle: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/10" }
  ];

  const topPerformingJobs = [
    { id: 1, title: "MERN Stack Developer", applicants: 142, views: "1.2k" },
    { id: 2, title: "React Native Engineer", applicants: 89, views: "940" },
    { id: 3, title: "DevOps Architect", applicants: 64, views: "510" }
  ];

  const hiringTrends = [
    { role: "AI Engineer", hot: true },
    { role: "React.js", hot: false },
    { role: "Next.js", hot: true },
    { role: "DevOps", hot: false },
    { role: "Cloud Security", hot: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto">

        {/* Welcome Header & Search Row */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back, Recruiter 👋</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage posts, track responses, and discover top-tier talent.</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search applicants, roles..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Full-Width 4-Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-gray-400 text-sm font-medium">Total Jobs</h3>
            <h1 className="text-3xl font-bold mt-1 text-gray-900">{stats.totalJobs}</h1>
            <p className="text-xs text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded mt-2 font-medium">+3 this week</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-gray-400 text-sm font-medium">Total Users</h3>
            <h1 className="text-3xl font-bold mt-1 text-gray-900">{stats.totalUsers}</h1>
            <p className="text-xs text-blue-600 bg-blue-50 w-fit px-2 py-0.5 rounded mt-2 font-medium">+120 this month</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-gray-400 text-sm font-medium">Applications</h3>
            <h1 className="text-3xl font-bold mt-1 text-gray-900">{stats.applications}</h1>
            <p className="text-xs text-orange-600 bg-orange-50 w-fit px-2 py-0.5 rounded mt-2 font-medium">+56 this week</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-gray-400 text-sm font-medium">Hired</h3>
            <h1 className="text-3xl font-bold mt-1 text-gray-900">{stats.hired}</h1>
            <p className="text-xs text-purple-600 bg-purple-50 w-fit px-2 py-0.5 rounded mt-2 font-medium">+4 this month</p>
          </div>
        </div>

        {/* Balanced Bottom Sections (2-Column Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

          {/* Left Block: Applications (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-base">Recent Applications</h3>
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-all">
                  Review All
                </button>
              </div>

              <div className="flex flex-col gap-3.5">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100/70 transition-all">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-bold text-base flex-shrink-0 flex items-center justify-center">
                        {app.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{app.name}</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">{app.role} • {app.company}</p>
                        <p className="text-[10px] text-gray-400 font-medium mt-0.5">{app.date}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${app.statusStyle}`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: Job Management Insights (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Performing Jobs */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-900">Top Performing Jobs</h2>
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 transition-all">
                  View All <ArrowRight size={12} />
                </button>
              </div>

              <div className="flex flex-col gap-3.5">
                {topPerformingJobs.map((job) => (
                  <div key={job.id} className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all">
                    <h4 className="text-sm font-bold text-gray-800">{job.title}</h4>
                    <div className="flex gap-4 mt-1.5 text-xs text-gray-500 font-medium">
                      <span>👥 {job.applicants} Applicants</span>
                      <span>👁️ {job.views} Views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hiring Trends */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-blue-600" />
                <h3 className="font-bold text-gray-900 text-base">In-Demand Market Roles</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {hiringTrends.map((trend, index) => (
                  <span
                    key={index}
                    className={`text-xs font-medium px-3 py-1.5 rounded-xl border transition-all cursor-default ${trend.hot
                      ? "bg-orange-50 text-orange-700 border-orange-100 font-semibold"
                      : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100"
                      }`}
                  >
                    {trend.role} {trend.hot && "🔥"}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RecruiterDashboard;