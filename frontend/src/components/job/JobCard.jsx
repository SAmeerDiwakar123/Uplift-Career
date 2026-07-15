import React, { useState } from "react";
import { MapPin, Clock, Users, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSavedJob } from "@/redux/savedJobSlice";
import axios from "axios";
import { APPLICATION_API_END_POINT, SAVED_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [applying, setApplying] = useState(false);

  // Check if applied
  const isApplied = job?.applications?.some((app) => app.applicant === user?._id) || false;
  // Check if saved
  const savedJobs = useSelector((store) => store.savedJob?.savedJobs) || [];
  const isJobSaved = savedJobs.some((j) => j._id === job?._id);

  // Helper function
  const daysAgo = (time) => {
    if (!time) return 0;
    const diff = new Date() - new Date(time);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  // Save job handler
  const handleSaveJob = async () => {
    try {
      dispatch(toggleSavedJob(job));
      await axios.post(`${SAVED_API_END_POINT}/job/${job._id}`, {}, { withCredentials: true });
    } catch (error) {
      dispatch(toggleSavedJob(job));
      console.log(error);
    }
  };

  // Save apply handler 
  const handleApplyJob = async () => {
    setApplying(true);
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/{job._id}`, {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(matchMedia({ jobId: job._id, userId: user._id }));
        toast.success(res.data.message || "Applied successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }finally{
      setApplying(false);
    }
  }

  // Fresher check
  const isFresher = !job?.experienceLevel || job?.experienceLevel == 0;

  return (
    <div className="bg-white rounded-xl border p-4 flex flex-col gap-3 hover:shadow-md transition">
      {/* Badge + Save */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600">
            {job?.jobType || "Full-time"}
          </span>
          {isFresher && (
            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
               🌱 Fresher
            </span>
          )}
        </div>
        <button
          onClick={handleSaveJob}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${isJobSaved ? "bg-indigo-50 border-indigo-200 text-indigo-600" : "text-gray-400 hover:text-indigo-600"
            }`}
        >
          <Bookmark size={15} fill={isJobSaved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Company */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
          {job?.company?.name?.charAt(0) || "C"}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {job?.company?.name || "Company"}
          </p>
          <p className="text-xs text-gray-500">{job?.location}</p>
        </div>
      </div>

      {/* Title */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900">{job?.title}</h2>
        <p className="text-xs text-gray-500 line-clamp-2 mt-1">{job?.description}</p>
      </div>

      {/* Details */}
      <div className="flex gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {job?.location}
        </span>
        <span className="flex items-center gap-1">
          <Users size={12} /> {job?.position || 0} openings
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)}d ago`}
        </span>
      </div>

      {/* Salary */}
      <div className="flex justify-between bg-gray-50 rounded-lg px-3 py-2">
        <span className="text-xs text-gray-500">Salary</span>
        <span className="text-sm font-semibold text-blue-600">
          {job?.salary ? `₹${job.salary} LPA` : "Not disclosed"}
        </span>
      </div>

      {/* Experience */}
      <div className="flex justify-between bg-blue-50 rounded-lg px-3 py-2">
        <span className="text-xs text-gray-500">Experience</span>
        <span className="text-sm font-semibold text-blue-600">
          {isFresher ? "Fresher" : `${job?.experienceLevel} Yr`}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/jobdetail/${job?._id}`)}
          className="flex-1 bg-indigo-600 text-white text-xs py-2 rounded-lg hover:bg-indigo-700"
        >
          View details
        </button>
        <button onClick={handleApplyJob} disabled={isApplied || applying}
          className={`px-5 border rounded-lg text-xs ${isApplied
              ? "bg-green-50 text-green-600 border-green-200 cursor-default"
              : "hover:border-indigo-500 hover:text-indigo-600"
            }`}
        >
          {isApplied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default JobCard;