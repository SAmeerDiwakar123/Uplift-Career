import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Jobs from './pages/student/Jobs';
import Courses from './pages/Courses';
import SavedJobs from './pages/student/SavedJobs';
import Applications from './pages/student/Applications';
import Profile from './pages/Profile';
import JobDetail from './pages/student/JobDetail';
import ApplyJob from './pages/ApplyJob';
import Dashboard from './pages/recruiter/Dashboard'
import AddJobs from "./pages/recruiter/AddJob"
import AddInternships from './pages/recruiter/AddInternship';
import CreateCompany from './pages/recruiter/CreateCompany'
import Companies from './pages/recruiter/Companies'
import CompanySetup from './pages/recruiter/CompanySetup'
import Applicants from './pages/recruiter/Applicants';
import CourseDetail from './pages/CourseDetail';
import Internships from './pages/student/Internships';
import InternshipDetail from './pages/student/InternshipDetail';

import AdminLogin from './pages/admin/AdminLogin';

import axios from "axios";
import Notifications from './pages/student/Notifications';
import StudentDashboard from './pages/student/StudentDashboard';
import ManageInternships from './pages/recruiter/ManageInternships';
import ManageJobs from './pages/recruiter/ManageJobs';
axios.defaults.withCredentials = true;

// Public Route — Login ho toh redirect
const PublicRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  if (user) {
    return user.role === "recruiter"
      ? <Navigate to="/recruiter/dashboard" replace />
      : <Navigate to="/jobs" replace />;
  }
  return children;
};

// Protected Route — Login nahi ho toh redirect
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  return user ? children : <Navigate to="/login" replace />;
};

// Student Only
const StudentRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "student") return <Navigate to="/recruiter/dashboard" replace />;
  return children;
};

// Recruiter Only
const RecruiterRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "recruiter") return <Navigate to="/jobs" replace />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes — Only for NOT logged in users */}
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
        <Route path="/contact" element={<PublicRoute><Contact /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />

        {/* Student Routes */}
        <Route path='/StudentDashboard' element={<StudentRoute><StudentDashboard /></StudentRoute>} />
        <Route path="/jobs" element={<StudentRoute><Jobs /></StudentRoute>} />
        <Route path="/jobs/:id" element={<StudentRoute><JobDetail /></StudentRoute>} />
        <Route path="/jobdetail/:id" element={<StudentRoute><JobDetail /></StudentRoute>} />
        <Route path="/internship" element={<StudentRoute><Internships /></StudentRoute>} />
        <Route path="/Internship/:id" element={<StudentRoute><InternshipDetail /></StudentRoute>} />
        <Route path="/notifications" element={<StudentRoute><Notifications /></StudentRoute>} />
        <Route path="/courses" element={<StudentRoute><Courses /></StudentRoute>} />
        <Route path="/course/:id" element={<StudentRoute><CourseDetail /></StudentRoute>} />
        <Route path="/saved" element={<StudentRoute><SavedJobs /></StudentRoute>} />
        <Route path="/applications" element={<StudentRoute><Applications /></StudentRoute>} />
        <Route path="/apply-job/:id" element={<StudentRoute><ApplyJob /></StudentRoute>} />

        {/* Common Protected */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Recruiter Routes */}
        <Route path="/recruiter/dashboard" element={<RecruiterRoute><Dashboard /></RecruiterRoute>} />
        <Route path="/recruiter/add-jobs" element={<RecruiterRoute><AddJobs /></RecruiterRoute>} />
        <Route path="/recruiter/add-internship" element={<RecruiterRoute><AddInternships /></RecruiterRoute>}></Route>
        <Route path="/recruiter/manage-jobs" element={<RecruiterRoute><ManageJobs /></RecruiterRoute>} />
        <Route path="/recruiter/manage-internships" element={<RecruiterRoute><ManageInternships /></RecruiterRoute>} />
        <Route path="/recruiter/create-company" element={<RecruiterRoute><CreateCompany /></RecruiterRoute>} />
        <Route path="/recruiter/companies" element={<RecruiterRoute><Companies /></RecruiterRoute>} />
        <Route path="/recruiter/companies/:id" element={<RecruiterRoute><CompanySetup /></RecruiterRoute>} />
        <Route path="/recruiter/jobs/:id/applicants" element={<RecruiterRoute><Applicants /></RecruiterRoute>} />
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;