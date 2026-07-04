import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bell, Trash2, CheckCheck, Briefcase, BookOpen, Building, Info } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import useGetNotifications from "@/hooks/useGetNotifications";
import { markOneRead, markAllReadLocal, removeNotification } from "@/redux/notificationSlice";
import { NOTIFICATION_API_END_POINT } from "@/utils/constant";

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useGetNotifications();

  const { notifications, unreadCount } = useSelector((store) => store.notification);

  // Icon by type
  const getIcon = (type) => {
    switch (type) {
      case "job": return <Briefcase size={14} className="text-indigo-400" />;
      case "internship": return <Building size={14} className="text-emerald-400" />;
      case "course": return <BookOpen size={14} className="text-amber-400" />;
      default: return <Info size={14} className="text-gray-400" />;
    }
  };

  const getIconBg = (type) => { 
    switch (type) {
      case "job": return "bg-indigo-500/10 border-indigo-500/20";
      case "internship": return "bg-emerald-500/10 border-emerald-500/20";
      case "course": return "bg-amber-500/10 border-amber-500/20";
      default: return "bg-white/5 border-[#2a2550]";
    }
  };

  // Mark single as read
  const handleMarkRead = async (id) => {
    dispatch(markOneRead(id));
    try {
      await axios.put(`${NOTIFICATION_API_END_POINT}/read/${id}`, {}, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  };

  // Mark all as read
  const handleMarkAllRead = async () => {
    dispatch(markAllReadLocal());
    try {
      await axios.put(`${NOTIFICATION_API_END_POINT}/read-all`, {}, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    dispatch(removeNotification(id));
    try {
      await axios.delete(`${NOTIFICATION_API_END_POINT}/delete/${id}`, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  };

  const timeAgo = (time) => {
    const diff = new Date() - new Date(time);
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-[#0a0818] min-h-screen text-white">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-xs text-gray-500 mt-0.5">{unreadCount} unread</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 border border-[#2a2550] px-3 py-1.5 rounded-xl"
            >
              <CheckCheck size={13} /> Mark all read
            </button>
          )}
        </div>

        {/* Empty State */}
        {notifications.length === 0 ? (
          <div className="text-center mt-24">
            <Bell size={40} className="mx-auto mb-3 opacity-20" />
            <p className="text-gray-600">No notifications yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {notifications.map((notif) => (
              <div
                key={notif._id}
                onClick={() => handleMarkRead(notif._id)}
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  notif.isRead
                    ? "bg-white/[0.02] border-[#1e1a3a]"
                    : "bg-indigo-500/[0.05] border-indigo-500/20"
                }`}
              >
                {/* Icon */}
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${getIconBg(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium ${notif.isRead ? "text-gray-400" : "text-white"}`}>
                      {notif.title}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notif._id);
                      }}
                      className="text-gray-700 hover:text-red-400 transition-colors shrink-0"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{notif.message}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-gray-700">{timeAgo(notif.createdAt)}</span>
                    {!notif.isRead && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Notifications;