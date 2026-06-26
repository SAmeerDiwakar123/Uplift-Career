import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { BookOpen, Clock, Star, Users, Play, Calendar, Award } from 'lucide-react';
import { COURSE_API_END_POINT } from '@/utils/constant';

const MyEnrollments = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    totalLessons: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchEnrolledCourses();
  }, [user]);

  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${COURSE_API_END_POINT}/my-enrollments`,
        { withCredentials: true }
      );
      
      if (res.data.success) {
        setEnrolledCourses(res.data.enrollments || []);
        calculateStats(res.data.enrollments || []);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load enrolled courses");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (courses) => {
    const total = courses.length;
    const completed = courses.filter(c => c.progress === 100).length;
    const inProgress = courses.filter(c => c.progress > 0 && c.progress < 100).length;
    const totalLessons = courses.reduce((sum, c) => sum + (c.course?.lessons?.length || 0), 0);
    
    setStats({ total, completed, inProgress, totalLessons });
  };

  const handleContinue = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading your courses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            My Enrollments
          </h1>
          <p className="text-sm text-gray-500">
            Continue learning from where you left off
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Courses</p>
                <p className="text-xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#EEEDFE' }}>
                <BookOpen size={18} style={{ color: '#534AB7' }} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">In Progress</p>
                <p className="text-xl font-bold text-gray-900">{stats.inProgress}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50">
                <Play size={18} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Completed</p>
                <p className="text-xl font-bold text-gray-900">{stats.completed}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-50">
                <Award size={18} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Lessons</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalLessons}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-50">
                <Calendar size={18} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Course List */}
        {enrolledCourses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Enrollments Yet
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              You haven't enrolled in any courses yet. Start your learning journey!
            </p>
            <button
              onClick={() => navigate('/courses')}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ background: '#534AB7' }}
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {enrolledCourses.map((enrollment) => {
              const course = enrollment.course;
              if (!course) return null;
              
              const progress = enrollment.progress || 0;
              const isCompleted = progress === 100;

              return (
                <div
                  key={enrollment._id}
                  className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Thumbnail */}
                    <div className="sm:w-48 h-40 sm:h-auto bg-gray-100 relative">
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div
                        className="w-full h-full flex items-center justify-center text-4xl"
                        style={{ display: course.thumbnail ? 'none' : 'flex', background: '#EEEDFE' }}
                      >
                        📚
                      </div>
                      
                      {/* Progress Badge */}
                      {isCompleted && (
                        <span className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full bg-green-500 text-white font-medium">
                          Completed ✓
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div className="flex-1">
                          <span 
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ background: '#EEEDFE', color: '#534AB7' }}
                          >
                            {course.category || 'General'}
                          </span>
                          <h3 className="text-sm font-bold mt-1 mb-1">
                            {course.title}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {course.description}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users size={12} />
                              {course.enrolledStudents?.length || 0} students
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen size={12} />
                              {course.lessons?.length || 0} lessons
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {course.validityYears || 1}y access
                            </span>
                          </div>

                          <p className="text-xs text-gray-400 mt-2">
                            Enrolled on: {formatDate(enrollment.enrolledAt)}
                          </p>
                        </div>

                        {/* Progress & Action */}
                        <div className="sm:text-right min-w-[120px]">
                          <div className="flex items-center sm:justify-end gap-2 mb-2">
                            <span className="text-sm font-semibold text-gray-700">
                              {progress}%
                            </span>
                            <span className="text-xs text-gray-500">complete</span>
                          </div>
                          <div className="w-full sm:w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ 
                                width: `${progress}%`,
                                background: progress === 100 ? '#22c55e' : '#534AB7'
                              }}
                            />
                          </div>
                          
                          <button
                            onClick={() => handleContinue(course._id)}
                            className="mt-2 px-4 py-1.5 rounded-lg text-xs font-medium text-white w-full sm:w-auto"
                            style={{ background: '#534AB7' }}
                          >
                            {isCompleted ? 'Review Course' : 'Continue'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEnrollments;