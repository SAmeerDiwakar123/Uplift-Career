import React, { useEffect, useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import axios from 'axios';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import { Search, Loader2, Trash2, BookOpen, Clock, Tag, IndianRupee } from 'lucide-react';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  // 1. Fetch all courses for admin
  const getAllCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const res = await axios.get(`${ADMIN_API_END_POINT}/courses`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      console.log('Courses API Response:', res.data); // Debug response in F12 console

      if (res.data?.success) {
        // Safe key extractors for various backend response formats
        const courseData =
          res.data.courses ||
          res.data.getCourses ||
          res.data.data ||
          res.data.allCourses ||
          [];
        setCourses(courseData);
      }
    } catch (error) {
      console.log('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  // 2. Delete Course Handler
  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      setDeleteLoadingId(courseId);
      const token = localStorage.getItem('token');

      const res = await axios.delete(`${ADMIN_API_END_POINT}/courses/delete/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res.data?.success) {
        setCourses((prev) => prev.filter((item) => item._id !== courseId));
      }
    } catch (error) {
      console.log('Error deleting course:', error);
      alert('Failed to delete course.');
    } finally {
      setDeleteLoadingId(null);
    }
  };

  // 3. Search Filter
  const filteredCourses = courses.filter((course) => {
    const matchTitle = course?.title?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = course?.category?.toLowerCase().includes(search.toLowerCase());
    return matchTitle || matchCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">All Platform Courses</h1>
            <p className="text-sm text-gray-500 mt-1">Review and manage courses offered to students</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border text-sm font-medium text-gray-600">
            Total Courses: <span className="font-bold text-blue-600">{courses.length}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by course title or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Courses Grid View */}
        {loading ? (
          <div className="text-center py-16 text-gray-500">
            <Loader2 className="animate-spin inline mr-2 text-blue-600" size={24} />
            Loading platform courses...
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 border">
            No courses found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail / Header */}
                  {course?.thumbnail ? (
                    <div className="h-40 w-full overflow-hidden bg-gray-100">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-32 w-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <BookOpen size={40} />
                    </div>
                  )}

                  <div className="p-5">
                    {/* Category Badge & Price */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100 inline-flex items-center gap-1">
                        <Tag size={12} />
                        {course?.category || 'General'}
                      </span>
                      <span className="font-bold text-gray-900 text-sm flex items-center">
                        {course?.price === 0 || course?.price === 'Free' ? (
                          <span className="text-green-600 font-semibold">Free</span>
                        ) : (
                          <>
                            <IndianRupee size={13} />
                            {course?.price}
                          </>
                        )}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-bold text-gray-900 text-base line-clamp-1 mt-1">
                      {course?.title || 'Untitled Course'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {course?.description || 'No course description available.'}
                    </p>

                    {/* Metadata: Duration / Level */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-4 pt-3 border-t border-gray-50">
                      {course?.duration && (
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-gray-400" />
                          {course.duration}
                        </span>
                      )}
                      {course?.level && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[11px]">
                          {course.level}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Action */}
                <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 flex justify-end">
                  <button
                    disabled={deleteLoadingId === course._id}
                    onClick={() => handleDeleteCourse(course._id)}
                    className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 font-medium text-xs rounded-lg border border-red-200 transition flex items-center gap-1"
                  >
                    {deleteLoadingId === course._id ? (
                      <Loader2 className="animate-spin" size={13} />
                    ) : (
                      <>
                        <Trash2 size={13} />
                        Delete Course
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;