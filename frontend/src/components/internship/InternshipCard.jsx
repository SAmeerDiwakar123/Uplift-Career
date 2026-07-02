import React from "react";
import { MapPin, Clock, Users, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleSavedInternship } from "@/redux/savedJobSlice";

const InternshipCard = ({ internship }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const savedInternships = useSelector((store) => store.savedJob?.savedInternships) ?? [];
const isSaved = savedInternships.some((i) => i._id === internship._id);

const handleSaveInternship = async () => {
  try {
    dispatch(toggleSavedInternship(internship));
    await axios.post(`${SAVED_API}/internship/${internship._id}`, {}, { withCredentials: true });
  } catch (error) {
    dispatch(toggleSavedInternship(internship));
    console.log(error);
  }
};


  const daysAgo = (time) => {
    if (!time) return 0;
    const diff = new Date() - new Date(time);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white rounded-xl border p-4 flex flex-col gap-3 hover:shadow-md transition">

      <div className="flex justify-between items-center">
        <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-600">
          Internship
        </span>

        <button onClick={()=> handleSaveInternship()} className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-400 hover:text-indigo-600">
          <Bookmark size={14} />
        </button>
      </div>


      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
          {internship?.company?.name?.charAt(0) || "C"}
        </div>


        <div>
          <p className="text-sm font-semibold text-gray-800">
            {internship?.company?.name || "Company"}
          </p>

          <p className="text-xs text-gray-500">
            {internship?.location}
          </p>
        </div>

      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-900">
          {internship?.title}
        </h2>

        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
          {internship?.description}
        </p>

      </div>



      <div className="flex gap-3 text-xs text-gray-500">

        <span className="flex items-center gap-1">
          <MapPin size={12} />
          {internship?.location}
        </span>


        <span className="flex items-center gap-1">
          <Users size={12} />
          {internship?.openings || 0} openings
        </span>


        <span className="flex items-center gap-1">
          <Clock size={12} />

          {
            daysAgo(internship?.createdAt) === 0
              ? "Today"
              : `${daysAgo(internship?.createdAt)}d ago`
          }

        </span>

      </div>



      <div className="flex justify-between bg-emerald-50 rounded-lg px-3 py-2">

        <span className="text-xs text-gray-500">
          Stipend
        </span>

        <span className="text-sm font-semibold text-emerald-600">
          ₹{internship?.stipend || 0}/month
        </span>

      </div>



      <div className="flex justify-between bg-gray-50 border rounded-lg px-3 py-2">

        <span className="text-xs text-gray-500">
          Duration
        </span>

        <span className="text-sm font-semibold text-indigo-600">
          {internship?.duration || "N/A"}
        </span>

      </div>



      <div className="flex gap-2">

        <button
          onClick={() => {
            console.log(internship._id)
            navigate(`/internship/${internship._id}`)
          }}
          className="flex-1 bg-indigo-600 text-white text-xs py-2 rounded-lg hover:bg-indigo-700">
          View details
        </button>


        <button
          onClick={() => navigate(`/internship/${internship?._id}`)}
          className="px-5 border rounded-lg text-xs hover:border-indigo-500 hover:text-indigo-600">
          Apply
        </button>


      </div>


    </div>
  );
};

export default InternshipCard;