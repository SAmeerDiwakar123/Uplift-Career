// Applications.jsx
import React, { useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import { MapPin, Clock, BadgeCheck, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import BottomNav from '@/components/shared/BottomNav';
import useGetAppliedInternships from '@/hooks/Internship/useGetAppliedInternships';

const Applications = () => {
  useGetAppliedJobs();
  useGetAppliedInternships();

  const [activeTab, setActiveTab] = useState("jobs");
  const [searchTerm, setSearchTerm] = useState("");
  const { allAppliedJobs = [] } = useSelector(store => store.job || {});
  const { myApplications = [] } = useSelector(store => store.internship || {});
  const navigate = useNavigate();

  const getItems = () => {
    const items = activeTab === "jobs" ? allAppliedJobs : myApplications;
    
    return items.filter(item => {
      const data = activeTab === "jobs" ? item?.job : item?.internship;
      if (!data) return false;
      
      const search = searchTerm.toLowerCase();
      return (
        (data?.title || '').toLowerCase().includes(search) ||
        (data?.company?.name || '').toLowerCase().includes(search) ||
        (data?.location || '').toLowerCase().includes(search)
      );
    });
  };

  const filteredItems = getItems();

  const renderCard = (item) => {
    const isJob = activeTab === "jobs";
    
    // ✅ Data alag hai but structure same
    const data = isJob ? item?.job : item?.internship;
    const id = isJob ? item?.job?._id : item?.internship?._id;
    const route = isJob ? `/jobdetail/${id}` : `/internship/${id}`;
    const status = item?.status || 'pending';

    return (
      <div
        key={item._id}
        className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-3"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-sm font-bold text-indigo-600 border border-indigo-100 shrink-0">
              {data?.company?.name?.charAt(0) || '?'}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1">
                <span className="truncate">{data?.company?.name || 'Company'}</span>
                <BadgeCheck size={10} className="text-indigo-500 shrink-0" />
              </h3>
              <h2 className="text-sm font-bold text-gray-900 truncate">
                {data?.title || 'Position'}
              </h2>
              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin size={9} />
                  <span className="truncate">{data?.location || 'Remote'}</span>
                </span>
                <span className="flex items-center gap-1 shrink-0">
                  <Clock size={9} />
                  {new Date(item?.createdAt).toLocaleDateString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
            <span
              className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                status === "accepted" || status === "selected"
                  ? "bg-green-50 text-green-600"
                  : status === "rejected"
                  ? "bg-red-50 text-red-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <button 
              onClick={() => navigate(route)} 
              className="text-[9px] text-indigo-600 hover:underline"
            >
              View {isJob ? 'Job' : 'Internship'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${
                activeTab === "jobs"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Jobs
              {allAppliedJobs?.length > 0 && (
                <span className={`ml-1 text-[10px] ${
                  activeTab === "jobs" ? "text-indigo-200" : "text-gray-400"
                }`}>
                  ({allAppliedJobs.length})
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("internships")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${
                activeTab === "internships"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Internships
              {myApplications?.length > 0 && (
                <span className={`ml-1 text-[10px] ${
                  activeTab === "internships" ? "text-indigo-200" : "text-gray-400"
                }`}>
                  ({myApplications.length})
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 mt-3 flex-1 w-full pb-24">
        <div className="flex items-center justify-between mb-3">
          <div className="hidden sm:block">
            <p className="text-xs text-gray-500">
              {filteredItems.length} {activeTab === "jobs" ? 'applications' : 'internships'} found
            </p>
          </div>
          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <div className="flex items-center gap-2 bg-white border rounded-lg px-2.5 py-1.5 w-full sm:w-56">
              <Search size={13} className="text-gray-400" />
              <input 
                type="text" 
                placeholder={`Search ${activeTab === "jobs" ? 'jobs' : 'internships'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="text-xs outline-none w-full bg-transparent" 
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')}>
                  <X size={13} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16 text-center">
            <span className="text-3xl sm:text-4xl mb-2">📋</span>
            <p className="text-sm text-gray-500 font-medium">
              No {activeTab === "jobs" ? 'job' : 'internship'} applications yet
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Apply to {activeTab === "jobs" ? 'jobs' : 'internships'} and track them here
            </p>
            <button 
              onClick={() => navigate(`/${activeTab === "jobs" ? 'jobs' : 'internships'}`)} 
              className="mt-3 bg-indigo-600 text-white text-xs font-semibold px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition"
            >
              Explore {activeTab === "jobs" ? 'Jobs' : 'Internships'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5">
            {filteredItems.map((item) => renderCard(item))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Applications;