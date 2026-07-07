import React from 'react';
import Navbar from '../../components/shared/Navbar';
import { Search, Settings,  } from 'lucide-react';

const StudentDashboard = () => {
  return (
    <>
      <Navbar />

      <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden">
        <div className="w-64 h-full bg-white border-r flex flex-col p-5">
          <div className="mb-8 font-bold text-lg text-blue-600">
            Student Portal
          </div>

          <nav className="flex flex-col gap-2">
            <button className="flex items-center gap-4 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium">
              Dashboard
            </button>

            <button className="flex items-center gap-4 px-4 py-2.5 rounded-xl hover:bg-gray-100">
              My Resume
            </button>

            <button className="flex items-center gap-4 px-4 py-2.5 rounded-xl hover:bg-gray-100">
              Applied Jobs & Internship
            </button>

            <button className="flex items-center gap-4 px-4 py-2.5 rounded-xl hover:bg-gray-100">
              Interviews
            </button>

            <button className="flex items-center gap-4 px-4 py-2.5 rounded-xl hover:bg-gray-100">
              Profile
            </button>
          </nav>


          {/* Setting */}
          <div className="pt-7 px-4">
            <h1 className='text-xs font-bold text-gray-800 mb-3'>SETTING</h1>

            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-100 cursor-pointer">
              <Settings size={18} />
              <h2 className="text-sm font-medium">
                Profile Settings
              </h2>
            </div>
          </div>

        </div>

        {/* Main Content */}
        <div className='flex-1 p-6 bg-lime-100 overflow-y-auto'>
          <div className='bg-white rounded-xl shadow p-6 mb-6 flex items-center justify-between'>

            <div>
              <h1 className='text-xl font-bold'>Welcome Back, Sameer 👋</h1>
              <p className='text-gray-700'>You have 3 interviews scheduled this week</p>
            </div>

            {/* Search Icon */}
            <div className='relative w-80'>
              <Search size={15} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input type="text" placeholder='search jobs, internship...' className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6">

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">Applied Jobs</h3>
              <h1 className="text-3xl font-bold mt-2">12</h1>
              <p className="text-green-600 mt-2">+2 This Week</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">Applied Internships</h3>
              <h1 className="text-3xl font-bold mt-2">8</h1>
              <p className="text-blue-600 mt-2">+1 This Week</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500 text-sm">Upcoming Interviews</h3>
              <h1 className="text-3xl font-bold mt-2">3</h1>
              <p className="text-orange-600 mt-2">This Week</p>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default StudentDashboard;