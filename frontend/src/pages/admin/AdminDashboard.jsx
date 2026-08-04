import React, { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ADMIN_API_END_POINT } from '@/utils/constant'; // <-- Apne constants file ka relative path adjust kar lein
import { Users, Briefcase, FileCheck, IndianRupee, BookOpen, ShieldCheck } from 'lucide-react';

const AdminDashboard = () => {
  // 1. Redux Store Data (User info & Fallbacks)
  const { user } = useSelector((store) => store.auth);
  const { alljobs = [] } = useSelector((store) => store.job);

  // Redux fallback calculation
  const reduxJobsCount = alljobs.length;
  const reduxAppsCount = alljobs.reduce((acc, job) => acc + (job?.applications?.length || 0), 0);

  // 2. Local State for Dashboard Metrics
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeJobs: reduxJobsCount,
    totalApplications: reduxAppsCount,
    totalCourses: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  // 3. Live API Fetching using ADMIN_API_END_POINT
  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        // GET Request to https://uplift-career-backend.vercel.app/api/v1/admin/stats
        const res = await axios.get(`${ADMIN_API_END_POINT}/stats`, {
          withCredentials: true,
        });

        if (res.data?.success || res.data?.stats) {
          const statsData = res.data.stats || res.data;

          setStats({
            totalUsers: statsData.totalUsers ?? 0,
            activeJobs: statsData.totalJobs ?? statsData.activeJobs ?? reduxJobsCount,
            totalApplications: statsData.totalApplications ?? reduxAppsCount,
            totalCourses: statsData.totalCourses ?? 0,
            revenue: statsData.totalRevenue ?? statsData.revenue ?? 0,
          });
        }
      } catch (error) {
        console.error("Error fetching live admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, [reduxJobsCount, reduxAppsCount]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Banner */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.fullname || user?.email?.split('@')[0] || "Admin"} 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Here is what's happening with your platform today.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-blue-100">
            <ShieldCheck size={16} />
            {user?.role ? user.role.toUpperCase() : "ADMINISTRATOR"}
          </span>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Total Users */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? "..." : stats.totalUsers}
              </p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Users size={24} />
            </div>
          </div>

          {/* Card 2: Active Jobs */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Active Jobs</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? "..." : stats.activeJobs}
              </p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Briefcase size={24} />
            </div>
          </div>

          {/* Card 3: Total Applications */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Applications</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? "..." : stats.totalApplications}
              </p>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
              <FileCheck size={24} />
            </div>
          </div>

          {/* Card 4: Total Courses (Dynamic Visibility) */}
          {stats.totalCourses > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Courses</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? "..." : stats.totalCourses}
                </p>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                <BookOpen size={24} />
              </div>
            </div>
          )}

          {/* Card 5: Revenue (Dynamic Visibility) */}
          {stats.revenue > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? "..." : `₹${stats.revenue.toLocaleString('en-IN')}`}
                </p>
              </div>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                <IndianRupee size={24} />
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;