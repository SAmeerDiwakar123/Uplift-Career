import './App.css'
import { Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
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

const appRouter = createBrowserRouter([
  { path:'/', element:<Home/>},
  { path:'/login', element:<Login/>},
  { path:'/signup', element:<SignUp/>},
  { path:'/jobs', element:<Jobs/>},
  {path:'/internship', element:<Internship/>},
  {path:'/saved', element:<SavedJobs/>},  
  {path:'/courses', element:<Courses/>},
  {path:'/profile', element:<Profile/>},
  {path: '/jobs/:id', element:<JobDetail/>},
  { path:'/apply-job/:id', element:<ApplyJob/>},
  { path:'/Applications', element:<Applications/>},
  {path: '/jobdetail/:id', element:<JobDetail/>},
  {path: '/admin/dashboard', element:<Dashboard/>},
  {path: '/admin/add-jobs', element:<AddJobs/>},
  {path: '/admin/manage-jobs', element:<ManageJob/>},
  {path: '/admin/create-company', element:<CreateCompany/>},
  {path: '/admin/companies', element:<Companies/>},
  {path: '/admin/companies/:id', element:<CompanySetup/>},
  {path: '/admin/jobs/:id/applicants', element:<Applicants/>}
])


const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App;