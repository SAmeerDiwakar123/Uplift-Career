import React, { useState, useEffect } from 'react';
import Navbar from "../../components/shared/Navbar"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { INTERNSHIP_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Edit2, Eye, Plus, Search, Trash2, Building } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Button } from '../../components/ui/button';
import BottomNav from '@/components/shared/BottomNav';

const ManageInternships = () => {
  const navigate = useNavigate(); 
  const [internships, setInternships] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [input, setInput] = useState({
    title: '', description: '', location: '',
    stipend: '', duration: '', openings: '',
    isRemote: false, isPPO: false,
  });

  const inputClass = "border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-300 w-full bg-white";
  const labelClass = "text-xs font-medium text-gray-600";

  // Fetch
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get(`${INTERNSHIP_API_END_POINT}/my-internships`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setInternships(res.data.internships);
          setFiltered(res.data.internships);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchInternships();
  }, []);

  // Search
  useEffect(() => {
    const result = internships.filter(i =>
      i.title?.toLowerCase().includes(search.toLowerCase()) ||
      i.company?.name?.toLowerCase().includes(search.toLowerCase()) ||
      i.location?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, internships]);

  // Edit
  const handleEdit = (intern) => {
    setSelected(intern);
    setInput({
      title: intern.title || '',
      description: intern.description || '',
      location: intern.location || '',
      stipend: intern.stipend || '',
      duration: intern.duration || '',
      openings: intern.openings || '',
      isRemote: intern.isRemote || false,
      isPPO: intern.isPPO || false,
    });
    setOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
      const res = await axios.put(`${INTERNSHIP_API_END_POINT}/update/${selected._id}`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        setInternships(internships.map(i => i._id === selected._id ? { ...i, ...input } : i));
        toast.success('Internship updated!');
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Internship delete karna chahte ho?')) return;
    try {
      await axios.delete(`${INTERNSHIP_API_END_POINT}/delete/${id}`, { withCredentials: true });
      setInternships(internships.filter(i => i._id !== id));
      toast.success('Internship deleted!');
    } catch {
      toast.error('Delete failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Building size={18} className="text-emerald-500" />
              Manage Internships
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">{filtered.length} internships posted</p>
          </div>
          <button
            onClick={() => navigate('/recruiter/add-internship')}
            className="flex items-center gap-1.5 bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-emerald-700 transition"
          >
            <Plus size={14} /> Post Internship
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={13} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, company, location..."
            className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-300 bg-white"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold">#</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold">Title</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold hidden md:table-cell">Company</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold hidden md:table-cell">Location</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold">Stipend</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold hidden md:table-cell">Duration</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold hidden md:table-cell">Posted</th>
                <th className="text-left py-3 px-4 text-xs text-gray-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400 text-sm">
                    <Building size={32} className="mx-auto mb-2 opacity-30" />
                    No internships posted yet
                  </td>
                </tr>
              ) : (
                filtered.map((intern, i) => (
                  <tr key={intern._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-gray-400 text-xs">{i + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-800 max-w-[120px] truncate">{intern?.title}</td>
                    <td className="py-3 px-4 text-gray-500 hidden md:table-cell">{intern?.company?.name}</td>
                    <td className="py-3 px-4 text-gray-500 hidden md:table-cell">{intern?.location}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100">
                        ₹{intern?.stipend}/mo
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 hidden md:table-cell">{intern?.duration}</td>
                    <td className="py-3 px-4 text-gray-400 text-xs hidden md:table-cell">
                      {new Date(intern?.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1.5">
                        <button onClick={() => handleEdit(intern)} className="p-1.5 rounded-lg bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white transition">
                          <Edit2 size={12} />
                        </button>
                        <button onClick={() => handleDelete(intern._id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition">
                          <Trash2 size={12} />
                        </button>
                        <button onClick={() => navigate(`/recruiter/internship/${intern._id}/applicants`)} className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition">
                          <Eye size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] sm:max-w-[500px] bg-white rounded-2xl p-5" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold text-gray-900">Edit Internship</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col gap-3 py-3">
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Title</label>
                <input type="text" value={input.title} onChange={(e) => setInput({ ...input, title: e.target.value })} className={inputClass} required />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Description</label>
                <textarea value={input.description} onChange={(e) => setInput({ ...input, description: e.target.value })} rows={3} className={`${inputClass} resize-none`} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Stipend (₹/mo)</label>
                  <input type="number" value={input.stipend} onChange={(e) => setInput({ ...input, stipend: e.target.value })} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Location</label>
                  <input type="text" value={input.location} onChange={(e) => setInput({ ...input, location: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Duration</label>
                  <select value={input.duration} onChange={(e) => setInput({ ...input, duration: e.target.value })} className={inputClass}>
                    <option value="">Select</option>
                    <option value="1 month">1 month</option>
                    <option value="2 months">2 months</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="1 year">1 year</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Openings</label>
                  <input type="number" value={input.openings} onChange={(e) => setInput({ ...input, openings: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div className="flex gap-5">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" checked={input.isRemote} onChange={(e) => setInput({ ...input, isRemote: e.target.checked })} className="w-4 h-4 accent-emerald-500" />
                  Remote
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" checked={input.isPPO} onChange={(e) => setInput({ ...input, isPPO: e.target.checked })} className="w-4 h-4 accent-emerald-500" />
                  PPO Available
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={updateLoading} className="w-full bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl py-2 text-sm">
                {updateLoading ? 'Updating...' : 'Update Internship'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <BottomNav/>
    </div>
  );
};

export default ManageInternships;