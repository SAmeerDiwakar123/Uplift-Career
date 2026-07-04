// Applications.jsx
import React, { useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import { MapPin, Clock, BadgeCheck, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import BottomNav from '@/components/shared/BottomNav';
import useGetAllInternships from '@/hooks/Internship/useGetAllInternships';

const Applications = () => {
  useGetAppliedJobs();
  useGetAllInternships();

  const [activeTab, setActiveTab] = useState("jobs");
  const [searchTerm, setSearchTerm] = useState("");
  const { allAppliedJobs = [], loading: jobsLoading } = useSelector(store => store.job || {});
  const { allInternships = [], loading: internshipLoading } = useSelector(store => store.internship || {});
  const navigate = useNavigate();

  const getItems = () => {
    const items = activeTab === "jobs" ? allAppliedJobs : allInternships;
    
    // Search filter
    return items.filter(item => {
      const data = activeTab === "jobs" ? item?.job : item;
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
  const isLoading = activeTab === "jobs" ? jobsLoading : internshipLoading;

  const renderCard = (item) => {
    const isJob = activeTab === "jobs";
    const data = isJob ? item?.job : item;
    const id = isJob ? item?.job?._id : item?._id;
    const route = isJob ? `/jobdetail/${id}` : `/internship/${id}`;

    return (
      <div
        key={item._id}
        className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-5"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-indigo-50 flex items-center justify-center text-base sm:text-xl font-bold text-indigo-600 border border-indigo-100 shrink-0">
              {data?.company?.name?.charAt(0) || '?'}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1">
                <span className="truncate">{data?.company?.name || 'Company'}</span>
                <BadgeCheck size={11} className="text-indigo-500 shrink-0" />
              </h3>
              <h2 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                {data?.title || 'Position'}
              </h2>
              <div className="flex items-center gap-2 sm:gap-3 mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin size={10} />
                  <span className="truncate">{data?.location || 'Remote'}</span>
                </span>
                <span className="flex items-center gap-1 shrink-0">
                  <Clock size={10} />
                  {new Date(item?.createdAt).toLocaleDateString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 sm:gap-2 shrink-0 ml-2">
            <span
              className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${
                item?.status === "accepted"
                  ? "bg-green-50 text-green-600"
                  : item?.status === "rejected"
                  ? "bg-red-50 text-red-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {item?.status || 'Pending'}
            </span>
            <button 
              onClick={() => navigate(route)} 
              className="text-[10px] sm:text-xs text-indigo-600 hover:underline"
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

      {/* Sticky Tab Bar */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition whitespace-nowrap ${
                activeTab === "jobs"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Jobs
              {allAppliedJobs?.length > 0 && (
                <span className={`ml-1.5 text-xs ${
                  activeTab === "jobs" ? "text-indigo-200" : "text-gray-400"
                }`}>
                  ({allAppliedJobs.length})
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("internships")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition whitespace-nowrap ${
                activeTab === "internships"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Internships
              {allInternships?.length > 0 && (
                <span className={`ml-1.5 text-xs ${
                  activeTab === "internships" ? "text-indigo-200" : "text-gray-400"
                }`}>
                  ({allInternships.length})
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 mt-4 flex-1 w-full pb-24">
        {/* Search and Count */}
        <div className="flex items-center justify-between mb-4">
          <div className="hidden sm:block">
            <p className="text-sm text-gray-500">
              {filteredItems.length} {activeTab === "jobs" ? 'applications' : 'internships'} found
            </p>
          </div>
          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <div className="flex items-center gap-2 bg-white border rounded-xl px-3 py-2 w-full sm:w-64">
              <Search size={14} className="text-gray-400" />
              <input 
                type="text" 
                placeholder={`Search ${activeTab === "jobs" ? 'jobs' : 'internships'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="text-xs outline-none w-full bg-transparent" 
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')}>
                  <X size={14} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center mt-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <span className="text-4xl sm:text-5xl mb-3">📋</span>
            <p className="text-sm sm:text-base text-gray-500 font-medium">
              No {activeTab === "jobs" ? 'job' : 'internship'} applications yet
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Apply to {activeTab === "jobs" ? 'jobs' : 'internships'} and track them here
            </p>
            <button 
              onClick={() => navigate(`/${activeTab === "jobs" ? 'jobs' : 'internships'}`)} 
              className="mt-4 bg-indigo-600 text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-1.5 sm:py-2 rounded-xl hover:bg-indigo-700 transition"
            >
              Explore {activeTab === "jobs" ? 'Jobs' : 'Internships'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {filteredItems.map((item) => renderCard(item))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Applications;







// // Applications.jsx
// import React, { useState } from 'react';
// import Navbar from '../../components/shared/Navbar';
// import { MapPin, Clock, BadgeCheck } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
// import BottomNav from '@/components/shared/BottomNav';
// import useGetAllInternships from '@/hooks/Internship/useGetAllInternships';

// const Applications = () => {
//   useGetAppliedJobs();
//   useGetAllInternships();

//   const [ activeTab, setActiveTab ] = useState("jobs");
//   const { allAppliedJobs } = useSelector(store => store.job)
//   const { allInternships } = useSelector(store => store.internship)

//   const navigate = useNavigate();

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-4 sm:mt-6 flex-1 w-full">

//         <div className="flex gap-2 mb-4 ">
//           <button
//             onClick={() => setActiveTab("jobs")}
//             className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
//               activeTab === "jobs"
//                 ? "bg-indigo-600 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             Jobs
//           </button>
//           <button
//             onClick={() => setActiveTab("internships")}
//             className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
//               activeTab === "internships"
//                 ? "bg-indigo-600 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             Internships
//           </button>
//         </div> 
        
//         {allAppliedJobs?.length == 0 && allInternships?.length == 0 ? (
//           <div className="flex flex-col items-center justify-center mt-20 text-center">
//             <span className="text-4xl sm:text-5xl mb-3">📋</span>
//             <p className="text-sm sm:text-base text-gray-500 font-medium">No applications yet</p>
//             <p className="text-xs sm:text-sm text-gray-400 mt-1">Apply to jobs and track them here</p>
//             <button onClick={() => navigate('/jobs')} className="mt-4 bg-indigo-600 text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-1.5 sm:py-2 rounded-xl hover:bg-indigo-700 transition">
//               Explore Jobs
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-3 sm:gap-4 pb-10">
//             {activeTab === "internships" && allInternships?.map((internship) => (<div
//               key={internship._id}
//               className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-5"
//             >
//               <div className="flex items-center justify-between gap-2">

//                 <div className="flex items-center gap-2 sm:gap-4">
//                   <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-indigo-50 flex items-center justify-center text-base sm:text-xl font-bold text-indigo-600 border border-indigo-100 shrink-0">
//                     {internship?.company?.name?.charAt(0)}
//                   </div>

//                   <div>
//                     <h3 className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1">
//                       {internship?.company?.name}
//                       <BadgeCheck size={11} className="text-indigo-500" />
//                     </h3>

//                     <h2 className="text-sm sm:text-base font-bold text-gray-900">
//                       {internship?.title}
//                     </h2>

//                     <div className="flex items-center gap-2 sm:gap-3 mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500">
//                       <span className="flex items-center gap-1">
//                         <MapPin size={10} />
//                         {internship?.location}
//                       </span>

//                       <span className="flex items-center gap-1">
//                         <Clock size={10} />
//                         {new Date(internship?.createdAt).toLocaleDateString("en-IN")}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-end gap-1.5 sm:gap-2 shrink-0">
//                   <span
//                     className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${internship?.status === "accepted"
//                       ? "bg-green-50 text-green-600"
//                       : internship?.status === "rejected"
//                         ? "bg-red-50 text-red-600"
//                         : "bg-yellow-50 text-yellow-600"
//                       }`}
//                   >
//                     {internship?.status}
//                   </span>

//                   <button onClick={() => navigate(`/internship/${internship?._id}`)} className="text-[10px] sm:text-xs text-indigo-600 hover:underline">
//                     View Job
//                   </button>
//                 </div>

//               </div>
//             </div>
//             ))}
//             { activeTab === "jobs" && allAppliedJobs?.map((app) => (
//               <div
//                 key={app._id}
//                 className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-3 sm:p-5"
//               >
//                 <div className="flex items-center justify-between gap-2">

//                   <div className="flex items-center gap-2 sm:gap-4">
//                     <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-indigo-50 flex items-center justify-center text-base sm:text-xl font-bold text-indigo-600 border border-indigo-100 shrink-0">
//                       {app?.job?.company?.name?.charAt(0)}
//                     </div>

//                     <div>
//                       <h3 className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1">
//                         {app?.job?.company?.name}
//                         <BadgeCheck size={11} className="text-indigo-500" />
//                       </h3>

//                       <h2 className="text-sm sm:text-base font-bold text-gray-900">
//                         {app?.job?.title}
//                       </h2>

//                       <div className="flex items-center gap-2 sm:gap-3 mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500">
//                         <span className="flex items-center gap-1">
//                           <MapPin size={10} />
//                           {app?.job?.location}
//                         </span>

//                         <span className="flex items-center gap-1">
//                           <Clock size={10} />
//                           {new Date(app?.createdAt).toLocaleDateString("en-IN")}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex flex-col items-end gap-1.5 sm:gap-2 shrink-0">
//                     <span
//                       className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${app?.status === "accepted"
//                         ? "bg-green-50 text-green-600"
//                         : app?.status === "rejected"
//                           ? "bg-red-50 text-red-600"
//                           : "bg-yellow-50 text-yellow-600"
//                         }`}
//                     >
//                       {app?.status}
//                     </span>

//                     <button onClick={() => navigate(`/jobdetail/${app?.job?._id}`)} className="text-[10px] sm:text-xs text-indigo-600 hover:underline">
//                       View Job
//                     </button>
//                   </div>

//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//       </div>
//       <BottomNav />
//     </div>
//   );
// };

// export default Applications;