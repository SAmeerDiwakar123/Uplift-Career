import React, { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import axios from 'axios';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import { Search, Loader2 } from 'lucide-react';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [btnLoading, setBtnLoading] = useState(null);
  
  // Users fetch function
  const getUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`${ADMIN_API_END_POINT}/users`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data?.success) {
        setUsers(res.data.users || []);
      }
    } catch (error) {
      console.log('Error getting users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Ban / Unban handler
  const toggleBan = async (userId, currentBanStatus) => {
    try {
      setBtnLoading(userId);
      const token = localStorage.getItem('token');

      const res = await axios.put(
        `${ADMIN_API_END_POINT}/users/ban/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        // Direct local state update (no unnecessary refresh)
        setUsers((prev) =>
          prev.map((item) =>
            item._id === userId ? { ...item, isBanned: !currentBanStatus } : item
          )
        );
      }
    } catch (error) {
      console.log('Ban action error:', error);
      alert('Failed to update status');
    } finally {
      setBtnLoading(null);
    }
  };

  // Simple Search & Filter
  const filteredUsers = users.filter((u) => {
    const matchName = u?.fullname?.toLowerCase().includes(search.toLowerCase());
    const matchEmail = u?.email?.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u?.role?.toLowerCase() === roleFilter.toLowerCase();

    return (matchName || matchEmail) && matchRole;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">All Registered Users</h1>
            <p className="text-sm text-gray-500 mt-1">Manage user access and roles</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border text-sm font-medium text-gray-600">
            Total Users: <span className="font-bold text-blue-600">{users.length}</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search user by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Role Filter Dropdown */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm bg-white outline-none text-gray-700 font-medium"
          >
            <option value="all">All Roles</option>
            <option value="student">Student</option>
            <option value="recruiter">Recruiter</option>
            <option value="admin">Admin</option>
          </select>

        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100/60 text-gray-600 text-xs font-semibold uppercase border-b">
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-500">
                      <Loader2 className="animate-spin inline mr-2 text-blue-600" size={20} />
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/80 transition">
                      
                      {/* Name */}
                      <td className="p-4 font-semibold text-gray-800">
                        {item?.fullname || 'N/A'}
                      </td>

                      {/* Email */}
                      <td className="p-4 text-gray-600">
                        {item?.email}
                      </td>

                      {/* Role */}
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-md capitalize ${
                          item?.role === 'admin' 
                            ? 'bg-purple-100 text-purple-700' 
                            : item?.role === 'recruiter' 
                            ? 'bg-amber-100 text-amber-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {item?.role || 'student'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        {item?.isBanned ? (
                          <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                            Banned
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                            Active
                          </span>
                        )}
                      </td>

                      {/* Action Button */}
                      <td className="p-4 text-right">
                        {item?.role === 'admin' ? (
                          <span className="text-xs text-gray-400 italic">Admin User</span>
                        ) : (
                          <button
                            disabled={btnLoading === item._id}
                            onClick={() => toggleBan(item._id, item.isBanned)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                              item?.isBanned
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-red-600 text-white hover:bg-red-700'
                            }`}
                          >
                            {btnLoading === item._id ? (
                              <Loader2 className="animate-spin inline" size={14} />
                            ) : item?.isBanned ? (
                              'Unban'
                            ) : (
                              'Ban User'
                            )}
                          </button>
                        )}
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AllUsers;