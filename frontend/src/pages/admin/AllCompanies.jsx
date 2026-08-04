import React, { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import axios from 'axios';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import { Search, Loader2, Trash2, Building2, MapPin, Globe, Calendar, AlertCircle } from 'lucide-react';

const AllCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Fetch all companies using general company endpoint
  const getCompanies = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const token = localStorage.getItem('token');

      // Backend route structure ke according direct company endpoint:
      const res = await axios.get(`https://uplift-career-backend.vercel.app/api/v1/company/get`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      console.log('Companies API Response:', res.data);

      if (res.data?.success) {
        // Safe data extraction
        const companyList = res.data.companies || res.data.company || res.data.data || [];
        setCompanies(companyList);
      } else {
        setErrorMsg('Failed to fetch companies from backend.');
      }
    } catch (error) {
      console.log('Error fetching companies:', error);
      setErrorMsg(error.response?.data?.message || 'Error connecting to companies API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  // 2. Delete company handler
  const handleDeleteCompany = async (companyId) => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;

    try {
      setDeleteLoadingId(companyId);
      const token = localStorage.getItem('token');
      
      // Delete API Call
      const res = await axios.delete(`${ADMIN_API_END_POINT}/companies/delete/${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data?.success) {
        setCompanies((prev) => prev.filter((item) => item._id !== companyId));
      }
    } catch (error) {
      console.log('Error deleting company:', error);
      alert('Failed to delete company. Ensure backend has delete company admin endpoint.');
    } finally {
      setDeleteLoadingId(null);
    }
  };

  // 3. Search Filter
  const filteredCompanies = companies.filter((comp) => {
    const matchName = comp?.name?.toLowerCase().includes(search.toLowerCase());
    const matchLocation = comp?.location?.toLowerCase().includes(search.toLowerCase());
    return matchName || matchLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">All Registered Companies</h1>
            <p className="text-sm text-gray-500 mt-1">Manage all recruiter and hiring organizations on the platform</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border text-sm font-medium text-gray-600">
            Total Companies: <span className="font-bold text-blue-600">{companies.length}</span>
          </div>
        </div>

        {/* Error Alert Box (if any) */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle size={20} className="flex-shrink-0" />
            <div>
              <p className="font-semibold">Unable to Load Companies</p>
              <p className="text-xs text-red-600">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by company name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Companies Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100/60 text-gray-600 text-xs font-semibold uppercase border-b">
                  <th className="p-4">Company</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Website</th>
                  <th className="p-4">Registered Date</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-500">
                      <Loader2 className="animate-spin inline mr-2 text-blue-600" size={20} />
                      Loading companies...
                    </td>
                  </tr>
                ) : filteredCompanies.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      No companies found.
                    </td>
                  </tr>
                ) : (
                  filteredCompanies.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/80 transition">
                      
                      {/* Logo & Name */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 border flex items-center justify-center overflow-hidden flex-shrink-0">
                            {item?.logo ? (
                              <img src={item.logo} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <Building2 size={20} className="text-gray-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{item?.name || 'N/A'}</h3>
                            <p className="text-xs text-gray-400 line-clamp-1">{item?.description || 'No description provided'}</p>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="p-4 text-gray-600">
                        <div className="flex items-center gap-1.5 text-xs">
                          <MapPin size={14} className="text-gray-400" />
                          <span>{item?.location || 'Not Specified'}</span>
                        </div>
                      </td>

                      {/* Website */}
                      <td className="p-4 text-gray-600">
                        {item?.website ? (
                          <a
                            href={item.website.startsWith('http') ? item.website : `https://${item.website}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1 text-xs"
                          >
                            <Globe size={13} />
                            Visit Site
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">N/A</span>
                        )}
                      </td>

                      {/* Registered Date */}
                      <td className="p-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={13} className="text-gray-400" />
                          {item?.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN') : 'N/A'}
                        </div>
                      </td>

                      {/* Delete Action */}
                      <td className="p-4 text-right">
                        <button
                          disabled={deleteLoadingId === item._id}
                          onClick={() => handleDeleteCompany(item._id)}
                          className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 font-semibold text-xs rounded-lg transition border border-red-200 inline-flex items-center gap-1"
                        >
                          {deleteLoadingId === item._id ? (
                            <Loader2 className="animate-spin inline" size={14} />
                          ) : (
                            <>
                              <Trash2 size={13} />
                              Delete
                            </>
                          )}
                        </button>
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

export default AllCompanies;