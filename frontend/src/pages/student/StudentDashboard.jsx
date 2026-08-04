import React, { useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import { Search, Settings, LayoutDashboard, FileText, Briefcase, Calendar, User, ArrowRight,
  ArrowLeft, Award, TrendingUp, Menu, X, GraduationCap, BookOpen } from 'lucide-react';
import JobCard from '@/components/job/JobCard';
import { useSelector } from 'react-redux';

const StudentDashboard = () => {
  const profileCompletion = 75; 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Redux States
  const alljobs = useSelector((store) => store.job?.alljobs || []);
  const allAppliedJobs = useSelector((store) => store.job?.allAppliedJobs || []);
  const { myApplications = [] } = useSelector(store => store.internship || {});
  const savedJobs = useSelector((store) => store.savedJob?.savedJobs) ?? [];
  
  // ✅ Course Redux State (अगर आपके स्टोर में नाम अलग हो तो चेंज कर सकते हैं)
  const myCourses = useSelector((store) => store.course?.myCourses || [
    { _id: "1", title: "Full Stack MERN BootCamp", progress: 60 },
    { _id: "2", title: "Advanced React & Next.js", progress: 25 }
  ]);

  // इंटरव्यू डेटा
  const interviews = [
    {
      id: 1,
      company: "Google",
      logoLetter: "G",
      logoBg: "bg-red-50 text-red-600 border border-red-100",
      role: "Frontend Developer",
      time: "Today, 2:00 PM"
    },
    {
      id: 2,
      company: "Amazon",
      logoLetter: "A",
      logoBg: "bg-amber-50 text-amber-600 border border-amber-100",
      role: "React Native Dev",
      time: "Tomorrow, 11:00 AM"
    },
    {
      id: 3,
      company: "Microsoft",
      logoLetter: "M",
      logoBg: "bg-blue-50 text-blue-600 border border-blue-100",
      role: "Full Stack Engineer",
      time: "Fri, 3:30 PM"
    }
  ];

  // एप्लीकेशन डेटा
  const applications = [
    {
      id: 1,
      company: "Flipkart",
      logoLetter: "F",
      logoBg: "bg-blue-50 text-blue-600 border border-blue-100",
      role: "Frontend Developer",
      date: "Applied 2 days ago",
      status: "In Review",
      statusStyle: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/10"
    },
    {
      id: 2,
      company: "Paytm",
      logoLetter: "P",
      logoBg: "bg-cyan-50 text-cyan-600 border border-cyan-100",
      role: "React Developer",
      date: "Applied 5 days ago",
      status: "Interview",
      statusStyle: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/10"
    },
    {
      id: 3,
      company: "Zomato",
      logoLetter: "Z",
      logoBg: "bg-red-50 text-red-600 border border-red-100",
      role: "MERN Stack",
      date: "Applied 1 week ago",
      status: "Rejected",
      statusStyle: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/10"
    }
  ];

  // ट्रेंडिंग स्किल्स डेटा
  const trendingSkills = [
    { name: "React.js", hot: true },
    { name: "Node.js", hot: false },
    { name: "TypeScript", hot: false },
    { name: "Next.js", hot: false },
    { name: "AWS", hot: false },
    { name: "Docker", hot: false }
  ];

  const handleBackToJobs = () => {
    console.log("Navigating back to jobs page...");
    window.location.href = '/jobs';
  };

  return (
    <>
      <Navbar />

      <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden relative">
        
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r flex flex-col p-5 justify-between flex-shrink-0 transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div>
            <div className="flex items-center justify-between mb-8 px-4">
              <div className="font-bold text-xl text-blue-600 tracking-wide">
                Student Portal
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 rounded-lg text-gray-500 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-1.5">
              <button className="flex items-center gap-3.5 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-sm transition-all">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </button>

              <button className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all">
                <FileText size={18} />
                <span>My Resume</span>
              </button>

              <button className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all">
                <Briefcase size={18} />
                <span>Applied Jobs</span>
              </button>

              <button className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all">
                <Calendar size={18} />
                <span>Interviews</span>
              </button>

              {/* Fix: Sidebar Link for Courses */}
              <button className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all">
                <GraduationCap size={18} />
                <span>My Courses</span>
              </button>
            </nav>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 cursor-pointer transition-all">
              <Settings size={18} />
              <span className="text-sm font-medium">Profile Settings</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 bg-gray-50 overflow-y-auto w-full">
          
          {/* Top Actions Line */}
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white border border-gray-200 text-gray-700 shadow-sm"
            >
              <Menu size={20} />
            </button>

            <button 
              onClick={handleBackToJobs}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl shadow-sm hover:text-blue-600 hover:border-blue-200 transition-all ml-auto lg:ml-0"
            >
              <ArrowLeft size={16} />
              <span>Back to Jobs</span>
            </button>
          </div>

          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Welcome Back, Sameer 👋</h1>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5">You have {interviews.length} interviews scheduled this week</p>
            </div>

            <div className="relative w-full sm:w-72 md:w-80">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" 
              />
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* 1. Applied Jobs */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-gray-400 text-sm font-medium">Applied Jobs</h3>
              <h1 className="text-2xl md:text-3xl font-bold mt-1 text-gray-900">
                {allAppliedJobs.length}
              </h1>
              <p className="text-xs text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded mt-2 font-medium"> 
                {allAppliedJobs.length > 0 ? `+${allAppliedJobs.length} Total` : 'No applications yet'}
              </p>
            </div>

            {/* 2. Applied Internships */}
            <div className="hidden sm:block bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-gray-400 text-sm font-medium">Applied Internships</h3>
              <h1 className="text-2xl md:text-3xl font-bold mt-1 text-gray-900">{myApplications.length}</h1>
              <p className="text-xs text-blue-600 bg-blue-50 w-fit px-2 py-0.5 rounded mt-2 font-medium">
                {myApplications.length > 0 ? `+${myApplications.length} Total`: 'No Applications yet'}
              </p>
            </div>

            {/* 3. Upcoming Interviews */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-gray-400 text-sm font-medium">Upcoming Interviews</h3>
              <h1 className="text-2xl md:text-3xl font-bold mt-1 text-gray-900">{interviews.length}</h1>
              <p className="text-xs text-orange-600 bg-orange-50 w-fit px-2 py-0.5 rounded mt-2 font-medium">Action Required</p>
            </div>

            {/* 4. Saved Jobs */}
            <div className="hidden sm:block bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-gray-400 text-sm font-medium">Saved Jobs</h3>
              <h1 className="text-2xl md:text-3xl font-bold mt-1 text-gray-900">{savedJobs.length}</h1>
              <p className="text-xs text-purple-600 bg-purple-50 w-fit px-2 py-0.5 rounded mt-2 font-medium">Review Later</p>
            </div>
          </div>

          {/* 3-Column Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            
            {/* COLUMN 1 STACK */}
            <div className="space-y-6">
              {/* Box 1: Recommended Jobs */}
              <div className="hidden sm:block bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-gray-900">Recommended for You</h2>
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 transition-all">
                    View All <ArrowRight size={12} />
                  </button>
                </div>

                <div className="flex flex-col gap-3.5">
                  {alljobs.slice(0, 2).map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              </div>

              {/* Box 4: Trending Skills Widget */}
              <div className="hidden md:block bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={18} className="text-blue-600" />
                  <h3 className="font-bold text-gray-900 text-base">Trending Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSkills.map((skill, index) => (
                    <span 
                      key={index} 
                      className={`text-xs font-medium px-3 py-1.5 rounded-xl border transition-all cursor-default ${
                        skill.hot 
                          ? "bg-orange-50 text-orange-700 border-orange-100 font-semibold" 
                          : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100"
                      }`}
                    >
                      {skill.name} {skill.hot && "🔥"}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* COLUMN 2 STACK */}
            <div className="space-y-6">
              {/* Box 2: Upcoming Interviews Widget */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 text-base mb-4">Upcoming Interviews</h3>
                <div className="flex flex-col gap-3.5">
                  {interviews.map((interview) => (
                    <div key={interview.id} className="flex items-start justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100/70 transition-all">
                      <div className="flex gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0 ${interview.logoBg}`}>
                          {interview.logoLetter}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{interview.company}</h4>
                          <p className="text-xs text-gray-500 font-medium mt-0.5">{interview.role}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                          {interview.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 5: Recent Applications Widget */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-base">Recent Applications</h3>
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-all">
                    Track All
                  </button>
                </div>
                <div className="flex flex-col gap-3.5">
                  {applications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100/70 transition-all">
                      <div className="flex gap-3 items-center">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0 ${app.logoBg}`}>
                          {app.logoLetter}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{app.role}</h4>
                          <p className="text-[11px] text-gray-400 mt-0.5">{app.company} • {app.date}</p>
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

            {/* COLUMN 3 STACK */}
            <div className="space-y-6">
              {/* Box 3: Profile Completion Widget */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Profile Score</h3>
                    <p className="text-xs text-gray-500">Impress 8x more recruiters</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-gray-600">Completion Setup</span>
                    <span className="text-blue-600">{profileCompletion}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                </div>

                <ul className="hidden md:block text-xs space-y-2.5 mb-5 text-gray-600">
                  <li className="flex items-center gap-2 text-green-600 font-medium">✓ Personal Info Added</li>
                  <li className="flex items-center gap-2 text-green-600 font-medium">✓ Education Added</li>
                  <li className="flex items-center gap-2 text-gray-500">○ Add Projects (+15%)</li>
                  <li className="flex items-center gap-2 text-gray-500">○ Upload Latest Resume (+10%)</li>
                </ul>

                <button className="w-full py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold text-sm rounded-xl transition-all">
                  Complete Profile
                </button>
              </div>

              {/* ✅ Box 6: New My Courses Widget (Added Below Profile) */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-indigo-600" />
                    <h3 className="font-bold text-gray-900 text-base">My Courses</h3>
                  </div>
                  <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-lg font-bold">
                    {myCourses.length} Enrolled
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {myCourses.length > 0 ? (
                    myCourses.map((course) => (
                      <div key={course._id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{course.title}</h4>
                          <span className="text-xs font-semibold text-gray-500">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 text-center py-2">No courses purchased yet.</p>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default StudentDashboard;