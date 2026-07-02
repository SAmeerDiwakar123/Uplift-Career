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
import Dashboard from './components/admin/Dashboard';
import AddJobs from './components/admin/AddJobs';
import ManageJob from './components/admin/ManageJob';
import CreateCompany from './components/admin/CreateCompany';
import Companies from './components/admin/Companies';
import CompanySetup from './components/admin/CompanySetup';
import Applicants from './components/admin/Applicants';
import CourseDetail from './pages/CourseDetail';
import Internships from './pages/student/Internships';
import InternshipDetail from './pages/student/InternshipDetail';

import axios from "axios";
axios.defaults.withCredentials = true;

// Public Route — Login ho toh redirect
const PublicRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  if (user) {
    return user.role === "recruiter"
      ? <Navigate to="/admin/dashboard" replace />
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
  if (user.role !== "student") return <Navigate to="/admin/dashboard" replace />;
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
        <Route path="/jobs" element={<StudentRoute><Jobs /></StudentRoute>} />
        <Route path="/jobs/:id" element={<StudentRoute><JobDetail /></StudentRoute>} />
        <Route path="/jobdetail/:id" element={<StudentRoute><JobDetail /></StudentRoute>} />
        <Route path="/internship" element={<StudentRoute><Internships /></StudentRoute>} />
        <Route path="/Internship/:id" element={<StudentRoute><InternshipDetail /></StudentRoute>} />
        <Route path="/courses" element={<StudentRoute><Courses /></StudentRoute>} />
        <Route path="/course/:id" element={<StudentRoute><CourseDetail /></StudentRoute>} />
        <Route path="/saved" element={<StudentRoute><SavedJobs /></StudentRoute>} />
        <Route path="/applications" element={<StudentRoute><Applications /></StudentRoute>} />
        <Route path="/apply-job/:id" element={<StudentRoute><ApplyJob /></StudentRoute>} />

        {/* Common Protected */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Recruiter Routes */}
        <Route path="/admin/dashboard" element={<RecruiterRoute><Dashboard /></RecruiterRoute>} />
        <Route path="/admin/add-jobs" element={<RecruiterRoute><AddJobs /></RecruiterRoute>} />
        <Route path="/admin/manage-jobs" element={<RecruiterRoute><ManageJob /></RecruiterRoute>} />
        <Route path="/admin/create-company" element={<RecruiterRoute><CreateCompany /></RecruiterRoute>} />
        <Route path="/admin/companies" element={<RecruiterRoute><Companies /></RecruiterRoute>} />
        <Route path="/admin/companies/:id" element={<RecruiterRoute><CompanySetup /></RecruiterRoute>} />
        <Route path="/admin/jobs/:id/applicants" element={<RecruiterRoute><Applicants /></RecruiterRoute>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;








// import './App.css';
// import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// import Home from './pages/Home';
// import Applications from './pages/Applications';
// import ApplyJob from './pages/ApplyJob';
// import Login from './components/auth/Login';
// import SignUp from './components/auth/SignUp';
// import Jobs from './pages/Jobs';
// import JobDetail from './pages/JobDetail';
// import Internship from './pages/Internship';
// import SavedJobs from './pages/SavedJobs';
// import Courses from './pages/Courses';
// import Profile from './pages/Profile';

// import Dashboard from './components/admin/Dashboard';
// import AddJobs from './components/admin/AddJobs';
// import ManageJob from './components/admin/ManageJob';
// import CreateCompany from './components/admin/CreateCompany';
// import Companies from './components/admin/Companies';
// import CompanySetup from './components/admin/CompanySetup';
// import Applicants from './components/admin/Applicants';
// import CourseDetail from './pages/CourseDetail';


// // Home Route
// const HomeRoute = () => {
//   const { user } = useSelector((store) => store.auth);
//   if (!user) return <Home />;
//   if (user.role === 'student') {
//     return <Navigate to="/jobs" replace />;
//   }
//   if (user.role === 'recruiter') {
//     return <Navigate to="/admin/dashboard" replace />;
//   }
//   return <Home />;
// };


// // Protected Route
// const ProtectedRoute = ({ children }) => {
//   const { user } = useSelector((store) => store.auth);
//   return user ? children : <Navigate to="/login" replace />;
// };


// // Login/Signup Only
// const PublicOnlyRoute = ({ children }) => {
//   const { user } = useSelector((store) => store.auth);

//   if (!user) return children;
//   return user.role === "recruiter"
//     ? <Navigate to="/admin/dashboard" replace />
//     : <Navigate to="/jobs" replace />;
// };


// // Recruiter Only
// const RecruiterRoute = ({ children }) => {
//   const { user } = useSelector((store) => store.auth);
//   if (!user) return <Navigate to="/login" replace />;
//   if (user.role !== "recruiter") {
//     return <Navigate to="/jobs" replace />;
//   }

//   return children;
// };

// // Student Only
// const StudentRoute = ({ children }) => {
//   const { user } = useSelector((store) => store.auth);
//   if (!user) return <Navigate to="/login" replace />;
//   if (user.role !== "student") {
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   return children;
// };


// const appRouter = createBrowserRouter([
//   { path: "/", element: <HomeRoute /> },

//   { path: "/login", element: <PublicOnlyRoute><Login /></PublicOnlyRoute> },
//   { path: "/signup", element: <PublicOnlyRoute><SignUp /></PublicOnlyRoute> },

//   { path: "/jobs", element: <StudentRoute><Jobs /></StudentRoute> },
//   { path: "/internship", element: <StudentRoute><Internship /></StudentRoute> },
//   { path: "/saved", element: <StudentRoute><SavedJobs /></StudentRoute> },
//   { path: "/courses", element: <StudentRoute><Courses /></StudentRoute> },
//   { path: "/course/:id", element: <StudentRoute><CourseDetail /></StudentRoute> },
//   { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
//   { path: "/jobs/:id", element: <StudentRoute><JobDetail /></StudentRoute> },
//   { path: "/jobdetail/:id", element: <StudentRoute><JobDetail /></StudentRoute> },
//   { path: "/apply-job/:id", element: <StudentRoute><ApplyJob /></StudentRoute> },
//   { path: "/applications", element: <StudentRoute><Applications /></StudentRoute> },
  
//   { path: "/admin/dashboard", element: <RecruiterRoute><Dashboard /></RecruiterRoute> },
//   { path: "/admin/add-jobs", element: <RecruiterRoute><AddJobs /></RecruiterRoute> },
//   { path: "/admin/manage-jobs", element: <RecruiterRoute><ManageJob /></RecruiterRoute> },
//   { path: "/admin/create-company", element: <RecruiterRoute><CreateCompany /></RecruiterRoute> },
//   { path: "/admin/companies", element: <RecruiterRoute><Companies /></RecruiterRoute> },
//   { path: "/admin/companies/:id", element: <RecruiterRoute><CompanySetup /></RecruiterRoute> },
//   { path: "/admin/jobs/:id/applicants", element: <RecruiterRoute><Applicants /></RecruiterRoute> },

//   { path: "*", element: <Navigate to="/" replace /> }
// ]);

// function App() {
//   return <RouterProvider router={appRouter} />;
// }

// export default App;

