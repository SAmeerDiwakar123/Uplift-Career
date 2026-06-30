import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { MapPin, Calendar, Tag, Clock, Bookmark, ArrowLeft, FileText, Wrench, Info, Users } from 'lucide-react';
import useGetInternshipById from '../../hooks/Internship/useGetInternshipById';
import { INTERNSHIP_API_END_POINT } from '@/utils/constant';

const InternshipDetail = () => {
  const params = useParams();
  const internshipId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useGetInternshipById(internshipId);

  const { user } = useSelector((store) => store.auth);
  const { singleInternship } = useSelector((store) => store.internship);

  const isApplied = singleInternship?.applications?.some(
    (app) => app === user?._id
  );

  const handleApply = async () => {
    try {
      const res = await axios.post(
        `${INTERNSHIP_API_END_POINT}/${internshipId}/apply`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };

  const daysAgo = (time) => {
    const diff = new Date() - new Date(time);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  if (!singleInternship) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 py-5 max-w-2xl mx-auto">

      {/* Back */}
      <div
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs text-gray-500 mb-4 cursor-pointer hover:text-gray-700"
      >
        <ArrowLeft size={14} /> Back to internships
      </div>

      {/* Header Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-lg font-semibold text-indigo-600">
              {singleInternship?.company?.name?.charAt(0) || 'C'}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 mb-0.5">
                {singleInternship?.title}
              </h1>
              <p className="text-sm text-gray-500">
                {singleInternship?.company?.name}
              </p>
            </div>
          </div>
          <button className="w-9 h-9 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center hover:border-indigo-400 hover:text-indigo-500 transition">
            <Bookmark size={15} />
          </button>
        </div>

        {/* Badges */}
        <div className="flex gap-2 flex-wrap mb-4">
          {singleInternship?.isRemote && (
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-200 font-medium">
              Remote
            </span>
          )}
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
            {singleInternship?.duration}
          </span>
          {singleInternship?.isPPO && (
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200 font-medium">
              PPO available
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 text-center">
            <div className="text-sm font-semibold text-gray-900">
              ₹{singleInternship?.stipend}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">Stipend / month</div>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 text-center">
            <div className="text-sm font-semibold text-gray-900">
              {singleInternship?.openings}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">Openings</div>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 text-center">
            <div className="text-sm font-semibold text-gray-900">
              {singleInternship?.applications?.length || 0}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">Applicants</div>
          </div>
        </div>

        {/* Apply Button */}
        {user?.role === 'student' && (
          <button
            onClick={handleApply}
            disabled={isApplied}
            className={`w-full py-3 rounded-xl text-sm font-medium transition-colors ${
              isApplied
                ? 'bg-green-50 text-green-600 border border-green-200 cursor-default'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
            }`}
          >
            {isApplied ? 'Already applied' : 'Apply now'}
          </button>
        )}
      </div>

      {/* About */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-3.5 shadow-sm">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 mb-2.5">
          <FileText size={15} className="text-gray-500" /> About this internship
        </div>
        <p className="text-[13px] text-gray-600 leading-relaxed">
          {singleInternship?.description}
        </p>
      </div>

      {/* Skills */}
      {singleInternship?.skills?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-3.5 shadow-sm">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 mb-2.5">
            <Wrench size={15} className="text-gray-500" /> Skills required
          </div>
          <div className="flex gap-2 flex-wrap">
            {singleInternship.skills.map((skill, i) => (
              <span
                key={i}
                className="text-[11px] px-3 py-1.5 rounded-lg border border-indigo-100 text-indigo-600 bg-indigo-50 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Details */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-3.5 shadow-sm">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 mb-3">
          <Info size={15} className="text-gray-500" /> Internship details
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
              <MapPin size={14} />
            </div>
            <div>
              <div className="text-[10px] text-gray-500">Location</div>
              <div className="text-xs font-medium text-gray-900">{singleInternship?.location}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
              <Calendar size={14} />
            </div>
            <div>
              <div className="text-[10px] text-gray-500">Apply by</div>
              <div className="text-xs font-medium text-gray-900">
                {singleInternship?.applyBy
                  ? new Date(singleInternship.applyBy).toLocaleDateString()
                  : 'Open'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
              <Tag size={14} />
            </div>
            <div>
              <div className="text-[10px] text-gray-500">Category</div>
              <div className="text-xs font-medium text-gray-900">{singleInternship?.category || 'General'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
              <Clock size={14} />
            </div>
            <div>
              <div className="text-[10px] text-gray-500">Posted</div>
              <div className="text-xs font-medium text-gray-900">
                {daysAgo(singleInternship?.createdAt)}d ago
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default InternshipDetail;