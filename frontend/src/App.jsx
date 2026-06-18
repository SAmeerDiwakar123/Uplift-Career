import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

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

// ✅ Components bahar define karo - useMemo ke andar nahi
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  return user ? children : <Navigate to="/login" replace />;
};

const PublicOnlyRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  return user ? <Navigate to="/jobs" replace /> : children;
};

const RecruiterRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "recruiter") return <Navigate to="/jobs" replace />;
  return children;
};

// ✅ Router bhi bahar define karo
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
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
    element: <ProtectedRoute><Jobs /></ProtectedRoute>
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
  // ✅ Admin routes - RecruiterRoute use karo
  {
    path: "/admin/dashboard",
    element: <RecruiterRoute><Dashboard /></RecruiterRoute>
  },
  {
    path: "/admin/add-jobs",
    element: <RecruiterRoute><AddJobs /></RecruiterRoute>
  },
  {
    path: "/admin/manage-jobs",
    element: <RecruiterRoute><ManageJob /></RecruiterRoute>
  },
  {
    path: "/admin/create-company",
    element: <RecruiterRoute><CreateCompany /></RecruiterRoute>
  },
  {
    path: "/admin/companies",
    element: <RecruiterRoute><Companies /></RecruiterRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <RecruiterRoute><CompanySetup /></RecruiterRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <RecruiterRoute><Applicants /></RecruiterRoute>
  }
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;