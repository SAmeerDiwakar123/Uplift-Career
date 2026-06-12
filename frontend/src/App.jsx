import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import Home from './pages/Home'
import Applications from './pages/Applications'
import ApplyJob from './pages/ApplyJob'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import Internship from './pages/Internship'
import SavedJobs from './pages/SavedJobs'
import Courses from './pages/Courses'
import Profile from './pages/Profile'
import Dashboard from './components/admin/Dashboard'
import AddJobs from './components/admin/AddJobs'
import ManageJob from './components/admin/ManageJob'
import CreateCompany from './components/admin/CreateCompany'
import Companies from './components/admin/Companies'
import CompanySetup from './components/admin/CompanySetup'
import Applicants from './components/admin/Applicants'

function App() {
  const { user } = useSelector((store) => store.auth);

  // Logged in user ko login/signup nahi dikhana
  const PublicOnlyRoute = ({ children }) => {
    return user ? <Navigate to="/jobs" replace /> : children;
  };

  // Bina login ke protected pages nahi dikhana
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  const appRouter = useMemo(() => createBrowserRouter([
{
  path: "/",
  element: user
    ? (user.role === "recruiter" ? <Navigate to="/admin/add-jobs" replace /> : <Navigate to="/jobs" replace />)
    : <Home />
},

    {
      path: "/login",
      element: <PublicOnlyRoute><Login /></PublicOnlyRoute>
    },
    {
      path: "/signup",
      element: <PublicOnlyRoute><SignUp /></PublicOnlyRoute>
    },
{
  path: "/jobs",
  element: <ProtectedRoute>{user?.role === "recruiter" ? <Navigate to="/admin/add-jobs" replace /> : <Jobs />}</ProtectedRoute>
},
    {
      path: "/internship",
      element: <ProtectedRoute><Internship /></ProtectedRoute>
    },
    {
      path: "/saved",
      element: <ProtectedRoute><SavedJobs /></ProtectedRoute>
    },
    {
      path: "/courses",
      element: <ProtectedRoute><Courses /></ProtectedRoute>
    },
    {
      path: "/profile",
      element: <ProtectedRoute><Profile /></ProtectedRoute>
    },
    {
      path: "/jobs/:id",
      element: <ProtectedRoute><JobDetail /></ProtectedRoute>
    },
    {
      path: "/apply-job/:id",
      element: <ProtectedRoute><ApplyJob /></ProtectedRoute>
    },
    {
      path: "/applications",
      element: <ProtectedRoute><Applications /></ProtectedRoute>
    },
    {
      path: "/jobdetail/:id",
      element: <ProtectedRoute><JobDetail /></ProtectedRoute>
    },
    {
      path: "/admin/dashboard",
      element: <ProtectedRoute><Dashboard /></ProtectedRoute>
    },
    {
      path: "/admin/add-jobs",
      element: <ProtectedRoute><AddJobs /></ProtectedRoute>
    },
    {
      path: "/admin/manage-jobs",
      element: <ProtectedRoute><ManageJob /></ProtectedRoute>
    },
    {
      path: "/admin/create-company",
      element: <ProtectedRoute><CreateCompany /></ProtectedRoute>
    },
    {
      path: "/admin/companies",
      element: <ProtectedRoute><Companies /></ProtectedRoute>
    },
    {
      path: "/admin/companies/:id",
      element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
    },
    {
      path: "/admin/jobs/:id/applicants",
      element: <ProtectedRoute><Applicants /></ProtectedRoute>
    }
  ]), [user]);

  return <RouterProvider router={appRouter} />;
}

export default App;