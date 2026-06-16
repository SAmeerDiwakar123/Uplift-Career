import React, { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { BadgeCheck, Mail, MapPin, Pencil, Phone, Clock, CheckCircle2, XCircle } from 'lucide-react';
import UpdateProfileDialog from '../components/UpdateProfileDialog'
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import BottomNav from '@/components/shared/BottomNav';

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const { allAppliedJobs } = useSelector(store => store.job);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-4xl mx-auto px-3 sm:px-4 mt-4 sm:mt-6 flex-1 w-full pb-10">

        {/* Top Card - User Info */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-xl sm:rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            {user?.profile?.profilePhoto ? (
              <img src={user.profile.profilePhoto} alt="Profile" className="h-full w-full rounded-xl sm:rounded-2xl object-cover" />
            ) : (
              <span className="text-2xl sm:text-4xl font-bold text-indigo-600">{user?.fullname?.charAt(0)}</span>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-2">
              {user?.fullname} <BadgeCheck size={15} className="text-indigo-500" />
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{user?.profile?.bio}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-500">
              <span className="flex items-center gap-1"><Mail size={10} />{user?.email}</span>
              <span className="flex items-center gap-1"><Phone size={10} />{user?.phoneNumber}</span>
              <span className="flex items-center gap-1"><MapPin size={10} />Bangalore, India</span>
            </div>
          </div>

          <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 text-xs sm:text-sm text-indigo-600 border border-indigo-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:bg-indigo-50 transition">
            <Pencil size={12} /> Edit Profile
          </button>
        </div>

        {/* Skills & Resume Row */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4'>
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3">Skills</h2>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 sm:py-1 bg-indigo-100 text-indigo-700 text-[10px] sm:text-xs rounded-md"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-xs sm:text-sm">No skills added</span>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3">Resume</h2>
            <div className="flex items-center justify-between bg-gray-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 border border-dashed border-gray-300">
              {isResume ? (
                <span className="text-xs sm:text-sm text-gray-600 font-medium truncate max-w-[60%]">{user?.profile?.resumeOriginalName}</span>
              ) : (
                <span className="text-xs text-gray-400">NA</span>
              )}
              <button
                onClick={() => window.open(user?.profile?.resume, "_blank")}
                className="text-[10px] sm:text-xs text-indigo-600 font-semibold hover:underline shrink-0"
              >
                Open Resume
              </button>
            </div>
          </div>
        </div>

        {/* Applied Jobs Table */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 mt-3 sm:mt-4">
          <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4">Applied Jobs</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider border-b border-gray-50">
                  <th className="pb-2 sm:pb-3 font-semibold">Date</th>
                  <th className="pb-2 sm:pb-3 font-semibold">Job Role</th>
                  <th className="pb-2 sm:pb-3 font-semibold hidden sm:table-cell">Company</th>
                  <th className="pb-2 sm:pb-3 text-right font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allAppliedJobs?.map((app) => (
                  <tr key={app._id} className="text-xs sm:text-sm">
                    <td className="py-2 sm:py-4 text-gray-500 whitespace-nowrap">
                      {new Date(app.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    <td className="py-2 sm:py-4 font-medium text-gray-800">
                      {app?.job?.title}
                    </td>

                    <td className="py-2 sm:py-4 text-gray-600 hidden sm:table-cell">
                      {app?.job?.company?.name}
                    </td>

                    <td className="py-2 sm:py-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider 
                          ${app.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : app.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {app.status === "accepted" && <CheckCircle2 size={10} />}
                        {app.status === "rejected" && <XCircle size={10} />}
                        {app.status === "pending" && <Clock size={10} />}
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <BottomNav/>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
};

export default Profile;









// import React, { useState } from 'react';
// import Navbar from '../components/shared/Navbar';
// import Footer from '../components/shared/Footer';
// import { BadgeCheck, Briefcase, Mail, MapPin, Pencil, Phone, Clock, CheckCircle2, XCircle, Badge } from 'lucide-react';
// import UpdateProfileDialog from '../components/UpdateProfileDialog'
// import { useSelector } from 'react-redux';
// import store from '@/redux/store';
// import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

// const isResume = true;
// const Profile = () => {
//   useGetAppliedJobs();
//   const [open, setOpen] = useState(false);
//   const { user } = useSelector(store => store.auth);

//   // Mock Data for Applied Jobs
//   const { allAppliedJobs } = useSelector(store => store.job);
//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Navbar />

//       <div className="max-w-4xl mx-auto px-4 mt-6 flex-1 w-full pb-10">

//         {/* Top Card - User Info */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
//           <div className="h-24 w-24 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-4xl font-bold text-indigo-600 shrink-0">
//             {user?.profile?.profilePhoto ? (
//               <img src={user.profile.profilePhoto} alt="Profile" className="h-full w-full rounded-2xl object-cover" />
//             ) : (
//               <span className="text-4xl font-bold text-indigo-600"> {user?.fullname?.charAt(0)}</span>
//             )}
//           </div>
//           <div className="flex-1 text-center sm:text-left">
//             <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-2">
//               {user?.fullname} <BadgeCheck size={18} className="text-indigo-500" />
//             </h1>
//             <p className="text-sm text-gray-500 mt-1"> {user?.profile?.bio}</p>
//             <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3 text-xs text-gray-500">
//               <span className="flex items-center gap-1"><Mail size={12} />{user?.email}</span>
//               <span className="flex items-center gap-1"><Phone size={12} /> {user?.phoneNumber}</span>
//               <span className="flex items-center gap-1"><MapPin size={12} />Bangalore, India</span>
//             </div>
//           </div>
//           <button onClick={() => setOpen(true)} className="flex items-center gap-2 text-sm text-indigo-600 border border-indigo-200 px-4 py-2 rounded-xl hover:bg-indigo-50 transition">
//             <Pencil size={14} /> Edit Profile
//           </button>
//         </div>

//         {/* Skills & Resume Row */}
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
//             <h2 className="text-base font-bold text-gray-900 mb-3">Skills</h2>
//             <div className="flex flex-wrap gap-2">
//               {user?.profile?.skills?.length > 0 ? (
//                 user.profile.skills.map((item, index) => (
//                   <span
//                     key={index}
//                     className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-md"
//                   >
//                     {item}
//                   </span>
//                 ))
//               ) : (
//                 <span className="text-gray-400 text-sm">No skills added</span>
//               )}
//             </div>
//           </div>
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
//             <h2 className="text-base font-bold text-gray-900 mb-3">Resume</h2>
//             <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2 border border-dashed border-gray-300">
//               {isResume ? <span className="text-sm text-gray-600 font-medium">{user?.profile?.resumeOriginalName}</span> : <span>NA</span>}
//               <button
//                 onClick={() => window.open(user?.profile?.resume, "_blank")}
//                 className="text-xs text-indigo-600 font-semibold hover:underline"
//               >
//                 Open Resume
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Applied Jobs Table Section */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-4">
//           <h2 className="text-base font-bold text-gray-900 mb-4">Applied Jobs</h2>

//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-50">
//                   <th className="pb-3 font-semibold">Date</th>
//                   <th className="pb-3 font-semibold">Job Role</th>
//                   <th className="pb-3 font-semibold">Company</th>
//                   <th className="pb-3 text-right font-semibold">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {allAppliedJobs?.map((app) => (
//                   <tr key={app._id} className="text-sm">
//                     <td className="py-4 text-gray-500">
//                       {new Date(app.createdAt).toLocaleDateString("en-IN")}
//                     </td>

//                     <td className="py-4 font-medium text-gray-800">
//                       {app?.job?.title}
//                     </td>

//                     <td className="py-4 text-gray-600">
//                       {app?.job?.company?.name}
//                     </td>

//                     <td className="py-4 text-right">
//                       <span
//                         className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider 
//         ${app.status === "accepted"
//                             ? "bg-green-100 text-green-700"
//                             : app.status === "rejected"
//                               ? "bg-red-100 text-red-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }`}
//                       >
//                         {app.status === "accepted" && <CheckCircle2 size={12} />}
//                         {app.status === "rejected" && <XCircle size={12} />}
//                         {app.status === "pending" && <Clock size={12} />}
//                         {app.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//       </div>

//       <UpdateProfileDialog open={open} setOpen={setOpen} />

//       <Footer />
//     </div>
//   );
// };

// export default Profile;