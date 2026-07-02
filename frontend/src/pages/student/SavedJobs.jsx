import React, { useEffect } from "react";
import Navbar from '../../components/shared/Navbar'
import BottomNav from "@/components/shared/BottomNav";
import JobCard from "../../components/job/JobCard"
import InternshipCard from "@/components/internship/InternshipCard";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SAVED_API_END_POINT } from "@/utils/constant";
import { setSavedJobs, setSavedInternships } from "@/redux/savedJobSlice";
import { Bookmark, ArrowRight } from "lucide-react";

const SavedJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedJobs = useSelector((store) => store.savedJob?.savedJobs) ?? [];
  const savedInternships = useSelector((store) => store.savedJob?.savedInternships) ?? [];

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const [jobsRes, intRes] = await Promise.all([
          axios.get(`${SAVED_API_END_POINT}/jobs`, { withCredentials: true }),
          axios.get(`${SAVED_API_END_POINT}/internships`, { withCredentials: true }),
        ]);
        if (jobsRes.data.success) dispatch(setSavedJobs(jobsRes.data.savedJobs.map((i) => i.job)));
        if (intRes.data.success) dispatch(setSavedInternships(intRes.data.savedInternships.map((i) => i.internship)));
      } catch (error) {
        console.log(error);
      }
    };
    fetchSaved();
  }, [dispatch]);

  const isEmpty = savedJobs.length === 0 && savedInternships.length === 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-4">
        {/* Compact Header */}
        <div className="hidden sm:block flex items-center gap-2 mb-4">
          <Bookmark size={18} className="text-blue-600" />
          <h1 className="text-base sm:text-lg font-bold text-slate-900">Saved</h1>
        </div>

        {isEmpty ? (
          <div className="text-center py-16">
            <Bookmark size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm text-slate-500 mb-4">No saved items yet</p>
            <button
              onClick={() => navigate("/jobs")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-500 transition"
            >
              Explore
              <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {savedJobs.map((job) => (
              <JobCard key={job._id} job={job} showRemove />
            ))}
            {savedInternships.map((internship) => (
              <InternshipCard key={internship._id} internship={internship} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default SavedJobs;





// import React, { useEffect } from "react";
// import Navbar from "../components/shared/Navbar";
// import BottomNav from "@/components/shared/BottomNav";
// import JobCard from "../components/job/JobCard";
// import InternshipCard from "@/components/internship/InternshipCard";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { SAVED_API_END_POINT } from "@/utils/constant";
// import {
//   setSavedJobs,
//   setSavedInternships,
// } from "@/redux/savedJobSlice";

// const SavedJobs = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const savedJobs =
//     useSelector((store) => store.savedJob?.savedJobs) ?? [];

//   const savedInternships =
//     useSelector((store) => store.savedJob?.savedInternships) ?? [];

//   useEffect(() => {
//     const fetchSavedJobs = async () => {
//       try {
//         const res = await axios.get(
//           `${SAVED_API_END_POINT}/jobs`,
//           {
//             withCredentials: true,
//           }
//         );

//         if (res.data.success) {
//           const jobs = res.data.savedJobs.map(
//             (item) => item.job
//           );

//           dispatch(setSavedJobs(jobs));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchSavedJobs();
//   }, [dispatch]);

//   useEffect(() => {
//     const fetchSavedInternships = async () => {
//       try {
//         const res = await axios.get(
//           `${SAVED_API_END_POINT}/internships`,
//           {
//             withCredentials: true,
//           }
//         );

//         if (res.data.success) {
//           const internships = res.data.savedInternships.map(
//             (item) => item.internship
//           );

//           dispatch(setSavedInternships(internships));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchSavedInternships();
//   }, [dispatch]);

//   const isEmpty =
//     savedJobs.length === 0 &&
//     savedInternships.length === 0;

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Navbar />

//       <div className="max-w-6xl mx-auto px-3 sm:px-4 mt-4 sm:mt-6 flex-1 w-full">
//         <h1 className="text-2xl font-bold text-gray-900">
//           Saved Jobs & Internships
//         </h1>

//         <p className="text-sm text-gray-400 mb-6">
//           Jobs and internships you saved for later.
//         </p>

//         {isEmpty ? (
//           <div className="flex flex-col items-center justify-center mt-20 text-center">
//             <span className="text-5xl mb-3">📭</span>

//             <p className="text-gray-500 font-medium">
//               No saved items yet
//             </p>

//             <p className="text-gray-400 text-sm mt-1">
//               Save jobs or internships from the explore page.
//             </p>

//             <button
//               onClick={() => navigate("/jobs")}
//               className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700"
//             >
//               Explore
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-24">
//             {savedJobs.map((job) => (
//               <JobCard
//                 key={job._id}
//                 job={job}
//                 showRemove={true}
//               />
//             ))}

//             {savedInternships.map((internship) => (
//               <InternshipCard
//                 key={internship._id}
//                 internship={internship}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       <BottomNav />
//     </div>
//   );
// };

// export default SavedJobs;